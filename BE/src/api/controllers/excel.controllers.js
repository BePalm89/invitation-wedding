import nodemailer from "nodemailer";
import { google } from "googleapis";

const auth = new google.auth.GoogleAuth({
  credentials: JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS), // Ensure this is correctly set
  scopes: [
    "https://www.googleapis.com/auth/spreadsheets",
    "https://www.googleapis.com/auth/drive.file",
  ],
});

const sheets = google.sheets("v4");
const drive = google.drive("v3");

export const generateExcel = async (req, res, next) => {
  try {
    console.log("generateExcel", req.body);
    const data = req.body;
    const authClient = await auth.getClient();

    // Define the title of the Google Sheet
    const sheetTitle = "Data Wedding";

    // Specify the folder ID where you want to store the spreadsheet
    const folderId = "1PNPH3vGfv8Lte2m2FlEx4S8xF7bLDssa"; 

    // Search for existing sheets
    const existingSheets = await drive.files.list({
      q: `name = '${sheetTitle}' and mimeType = 'application/vnd.google-apps.spreadsheet' and '${folderId}' in parents`,
      fields: "files(id, name)",
      auth: authClient,
    });

    console.log(existingSheets);

    let spreadsheetId;

    // If the sheet exists, get its ID; otherwise, create a new sheet
    if (existingSheets.data.files.length > 0) {
      spreadsheetId = existingSheets.data.files[0].id; // Use the first found spreadsheet ID
      console.log(`Found existing spreadsheet with id ${spreadsheetId}`);
    } else {
      // Create a new spreadsheet
      const resource = {
        properties: {
          title: sheetTitle,
        },
      };

      const sheetResponse = await sheets.spreadsheets.create({
        auth: authClient,
        resource,
      });

      spreadsheetId = sheetResponse.data.spreadsheetId;
      console.log(`Created new spreadsheet with id ${spreadsheetId}`);

      // Move the newly created spreadsheet to the specified folder
      await drive.files.update({
        fileId: spreadsheetId,
        addParents: folderId,
        auth: authClient,
      });

      console.log(`Moved spreadsheet to folder: ${folderId}`);

      // Add column headers
      const headerValues = [["Name", "Surname"]];
      const headerRequest = {
        spreadsheetId: spreadsheetId,
        range: "Sheet1!A1", // The range where you want to set headers
        valueInputOption: "RAW",
        resource: {
          values: headerValues,
        },
        auth: authClient,
      };

      await sheets.spreadsheets.values.update(headerRequest);
      console.log(`Header added to new spreadsheet: ${spreadsheetId}`);
    }

    // Prepare to append data
    const range = "Sheet1!A1"; // The starting range for appending data
    const valueInputOption = "RAW";

    // Get current data from the spreadsheet
    const currentValues = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: range,
      auth: authClient,
    });

    // Prepare new values to append
    const newValues = [[data.name, data.surname]];

    // If there are existing values, append to the next empty row
    const appendRow = currentValues.data.values
      ? currentValues.data.values.length + 1
      : 1; // Get the row count to append correctly
    const appendRange = `Sheet1!A${appendRow}`;

    const request = {
      spreadsheetId,
      range: appendRange,
      valueInputOption,
      resource: {
        values: newValues,
      },
      auth: authClient,
    };

    // Append the data to the spreadsheet
    await sheets.spreadsheets.values.append(request);
    console.log(`Data added to spreadsheet: ${spreadsheetId}`);

    // Send the email notification
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
    const mailOptions = {
      to: "cla.palmerini@gmail.com",
      subject: "Wedding data",
      text: `Please check the excel file at this link https://docs.google.com/spreadsheets/d/1UXPWOesdKaMp_d19JX4DcutUyTl3brYQFdAOp3ySA00/edit?gid=0#gid=0.`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        return res
          .status(500)
          .send({ error: "An error occurred while sending the email." });
      }
      console.log("Email sent:", info);
      res.status(200).send({ message: "Email sent successfully" });
    });
  } catch (error) {
    console.error(error); // Log the error for debugging
    return next(error);
  }
};
