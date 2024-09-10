import moment from "moment";

const useMomentFormat = (timeString: string) => {
  const formattedTime = moment(timeString).format("YYYY-MM-DD HH:mm:ss") || "";
  return formattedTime;
};

export default useMomentFormat;
