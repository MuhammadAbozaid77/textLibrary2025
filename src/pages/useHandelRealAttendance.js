import { useEffect, useState } from "react";
import useGetLocation from "./useGetLocation";
import { addStudentToLecture } from "../data/api";
import { isWithin50Meters } from "../data/checkMeters";

export default function useHandelRealAttendance(scanResult) {
  const { getLocation, location } = useGetLocation();
  const [attendanceStatus, setAttendanceStatus] = useState("");

  useEffect(() => {
    getLocation();
  }, [getLocation]); // Ensure location updates when needed

  useEffect(() => {
    const markAttendance = async () => {
      if (
        scanResult?.Latitude &&
        scanResult?.Longitude &&
        location?.lat &&
        location?.lon &&
        scanResult?.AcademicNumber &&
        scanResult?.SectionId &&
        scanResult?.EmployeeId &&
        scanResult?.LectureId &&
        scanResult?.CourseNumber
      ) {
        // Check if student is within 50 meters of lecture location
        const isNearby = isWithin50Meters(
          scanResult.Latitude,
          scanResult.Longitude,
          location.lat,
          location.lon
        );

        if (isNearby) {
          try {
            const response = await addStudentToLecture({
              EmployeeId: scanResult?.EmployeeId,
              LectureId: scanResult?.LectureSessionId,
              CourseNumber: scanResult?.CourseNumber,
              AcademicNumber: 23006100862,
              SectionId: 40,
            });
            setAttendanceStatus(response);
          } catch (error) {
            console.error(
              "Error marking attendance: Cant Fetching Data",
              error
            );
            setAttendanceStatus(null);
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

  return attendanceStatus;
}
