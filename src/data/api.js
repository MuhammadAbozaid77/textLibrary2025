/******************************************************************************/

import axios from "axios";

export async function addStudentToLecture(arg) {
  // eslint-disable-next-line no-useless-catch
  try {
    const { data } = await axios.get(
      `https://educationapi.mygatein.com/Dashboard/AttendanceRegister?data=${JSON.stringify(
        arg
      )}`
    );
    return data && JSON.parse(data?.[0]?.jsonData);
  } catch (error) {
    throw error;
  }
}
