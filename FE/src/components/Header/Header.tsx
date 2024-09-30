import { LANGUAGES } from "../../constants";
import i18n from "../../i18n";
import "./Header.css";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  HStack,
  Text,
  Image,
} from "@chakra-ui/react";

export const Header = () => {
  const onChangeLang = (lang_code: string) => {
    i18n.changeLanguage(lang_code);
  };

  const currentLang = i18n.language || "es";

  const currentLanguage = LANGUAGES.find(lang => lang.code === currentLang);

  return (
    <header>
      <Menu>
        <MenuButton as={Button} size='sm' width="max-content">
          <HStack>
            <Image boxSize="20px" src={currentLanguage?.icon} alt={`${currentLang} flag`} />
            <Text>{currentLanguage?.label || "Language"}</Text>
          </HStack>
        </MenuButton>
        
        <MenuList className="menu-list">
          {LANGUAGES.map(({ code, label, icon }) => (
            <MenuItem key={code} onClick={() => onChangeLang(code)}>
              <HStack>
                <Image boxSize="20px" src={icon} alt={`${label} flag`} />
                <Text>{label}</Text>
              </HStack>
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
    </header>
  );
};
