import i18n from "@/i18n";
const { t } = i18n.global;

export const elTourDataOptions = [
  {
    title: t("tour_welcomeTitle"),
    description: t("tour_welcomeDescription"),
  },
  {
    target: "#el_tour_visible_1",
    title: "",
    description: t("tour_menuDescription"),
    placement: "right",
  },
  {
    target: "#el_tour_visible_2",
    title: "",
    description: t("tour_toggleButtonDescription"),
    placement: "bottom",
  },
  {
    target: "#el_tour_visible_3",
    title: "",
    description: t("tour_breadcrumbDescription"),
    placement: "bottom",
  },
  {
    target: "#el_tour_visible_4",
    title: "",
    description: t("tour_tabNavigationDescription"),
    placement: "bottom",
  },
  {
    target: "#el_tour_visible_5",
    title: "",
    description: t("tour_menuSearchDescription"),
    placement: "bottom",
  },
  {
    target: "#el_tour_visible_6",
    title: "",
    description: t("tour_fullscreenDescription"),
    placement: "bottom",
  },
  {
    target: "#el_tour_visible_7",
    title: "",
    description: t("tour_themeSwitchDescription"),
    placement: "bottom",
  },
  {
    target: "#el_tour_visible_8",
    title: t("tour_languageSwitchTitle"),
    description: t("tour_languageSwitchDescription"),
    placement: "bottom",
  },
  {
    target: "#el_tour_visible_9",
    title: "",
    description: t("tour_notificationDescription"),
    placement: "bottom",
  },
  {
    target: "#el_tour_visible_10",
    title: "",
    description: t("tour_userSettingsDescription"),
    placement: "bottom",
  },
  {
    target: "#el_tour_visible_11",
    title: t("tour_customSettingsTitle"),
    description: t("tour_customSettingsDescription"),
    placement: "left",
  },
];
