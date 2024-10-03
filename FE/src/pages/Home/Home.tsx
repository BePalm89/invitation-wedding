import { useTranslation } from "react-i18next";
import { Title } from "../../components/Title/Title";
import { Text } from "../../components/Text/Text";
import "./Home.css";
import { GoogleMapComponent } from "../../components/GoogleMap/GoogleMap";
import { ButtonComponent } from "../../components/ButtonComponent/ButtonComponent";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const { t } = useTranslation();

  const navigate = useNavigate();

  return (
    <div>
      <main>
        <Title
          icon={"/img/referee.png"}
          text={t("title.start")}
          alignment="left"
        />
        <div className="welcome-message-container">
          <Text text={t("text.welcome")} />
          <Text
            text={t("text.where")}
            link={{
              label: "Masia Casa Del Mar",
              href: "https://masiacasadelmar.com/",
            }}
          />
          <Text text={t("text.invitation")} />
          <Text text={t("text.booking")} />
          <Text text={t("text.present")} />
        </div>
        <Title
          icon={"/img/yellow-card.png"}
          text={t("title.one-way-bus")}
          alignment="right"
        />
        <Text
          text={t("text.one-way-bus")}
          link={{
            label: "IBIS Barcelona Meridiana",
            href: "https://all.accor.com/hotel/3310/index.es.shtml?utm_campaign=seo+maps&utm_medium=seo+maps&utm_source=google+Maps",
          }}
        />
        <GoogleMapComponent
          location={{ lat: 41.435472, lng: 2.182126 }}
          icon={"/img/bus.png"}
        />
        <Title
          icon={"/img/goal.png"}
          text={t("title.ceremony")}
          alignment="left"
        />
        <Text
          text={t("text.ceremony-msg")}
          link={{
            label: "Masia Casa Del Mar",
            href: "https://masiacasadelmar.com/",
          }}
        />
        <GoogleMapComponent
          location={{ lat: 41.2197539, lng: 1.7508404 }}
          icon={"/img/party.png"}
        />
        <Title
          icon={"/img/yellow-card.png"}
          text={t("title.return-bus")}
          alignment="right"
        />
        <Text text={t("text.return-bus-msg")} />
        <Title
          icon={"/img/goal.png"}
          text={t("title.hotels")}
          alignment="left"
        />
        <Text text={t("text.hotels-msg")} />
        <Title
          icon={"/img/substitution.png"}
          text={t("title.your-election")}
          alignment="right"
        />
        <Text text={t("text.your-election-msg")} />
        <Text text={t("text.questions")} />
        <ButtonComponent
          type="button"
          label={t("button.fill-form")}
          onClick={() => navigate("/choices")}
        ></ButtonComponent>
        <h1>
          <img src="/img/party.png" alt="party icon" /> {t("title.waiting")}{" "}
          <img src="/img/party.png" alt="party icon" />
        </h1>
      </main>
    </div>
  );
};
