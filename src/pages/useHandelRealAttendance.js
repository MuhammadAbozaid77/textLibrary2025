import { useEffect, useState } from "react";
import useGetLocation from "./useGetLocation";
// import { addStudentToLecture } from "../data/api";
import { isWithin50Meters } from "../data/checkMeters";

export default function useHandelRealAttendance(scanResult) {
  const { getLocation, location } = useGetLocation();
  const [attendanceStatus, setAttendanceStatus] = useState("");

  useEffect(() => {
    getLocation();
  }, []); // Only call getLocation once

  useEffect(() => {
    const markAttendance = async () => {
      if (!scanResult) return;

      const parsedData = JSON.parse(scanResult); // Ensure scanResult is parsed
      const {
        Latitude,
        Longitude,
        AcademicNumber,
        SectionId,
        EmployeeId,
        LectureId,
        CourseNumber,
      } = parsedData;

      if (
        Latitude &&
        Longitude &&
        location?.lat &&
        location?.lon &&
        AcademicNumber &&
        SectionId &&
        EmployeeId &&
        LectureId &&
        CourseNumber
      ) {
        const isNearby = isWithin50Meters(
          Latitude,
          Longitude,
          location.lat,
          location.lon
        );

        if (isNearby) {
          try {
            // const response = await addStudentToLecture({
            //   EmployeeId,
            //   LectureId,
            //   CourseNumber,
            //   AcademicNumber,
            //   SectionId,
            // });
            setAttendanceStatus(isNearby);
          } catch (error) {
            console.error("Error marking attendance:", error);
            setAttendanceStatus("Error marking attendance:");
          }
        } else {
          setAttendanceStatus(
            "Student is not within the required location range."
          );
        }
      }
    };

    if (location?.lat && location?.lon) {
      markAttendance();
    }
  }, [location, scanResult]);

  return { attendanceStatus };
}
