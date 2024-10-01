import { useLocation, useNavigate } from "react-router-dom";
import { LANGUAGES } from "../../constants";
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
import { useTranslation } from "react-i18next";
import { ArrowBackIcon } from "@chakra-ui/icons";

export const Header = () => {
  const { i18n } = useTranslation();

  const { pathname } = useLocation();

  const navigate = useNavigate();

  const onChangeLang = (lang_code: string) => {
    i18n.changeLanguage(lang_code);
  };

  const currentLang = i18n.language || "es";

  const currentLanguage = LANGUAGES.find((lang) => lang.code === currentLang);

  const isHome = pathname === "/";

  return (
    <header>
      <div className="header-left">
        {!isHome && <ArrowBackIcon boxSize={6} onClick={() => navigate("/")} />}
      </div>
      <div className="header-right">
        <Menu>
          <MenuButton as={Button} size="sm" width="max-content">
            <HStack>
              <Image
                boxSize="20px"
                src={currentLanguage?.icon}
                alt={`${currentLang} flag`}
              />
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
      </div>
    </header>
  );
};
