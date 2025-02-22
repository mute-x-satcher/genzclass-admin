import { useEffect, useState } from "react";
import { fetchStudentData, Student } from "../firebase/firebase";
import { PhoneCall } from "lucide-react";
import { Loader, AlertTriangle } from "lucide-react";

const StudentList = () => {
    const [students, setStudents] = useState<Student[]>([]);
    const [loading, setLoading] = useState(true);
    const [filteredStudents, setFilteredStudents] = useState<Student[]>([]);
    const [selectedGrade, setSelectedGrade] = useState<string>("all");

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            await fetchStudentData(setStudents); // ✅ No need to store in a variable
            setLoading(false);
        };
        fetchData();
    }, []);

    // ✅ Filter students whenever selectedGrade or students change
    useEffect(() => {
        if (selectedGrade === "all") {
            setFilteredStudents(students); // ✅ Show all students when "all" is selected
        } else {
            setFilteredStudents(students.filter(student => student.grade === selectedGrade));
        }
    }, [selectedGrade, students]);
    

    return (
        <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 text-center mb-10 pt-6">
                    📋       </h2>
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 text-center mb-10 ">
                    Student Applications
                </h2>


                {/* 🔍 Filter Dropdown */}
                <div className="mb-6 flex justify-center">
                    <select
                        value={selectedGrade}
                        onChange={(e) => setSelectedGrade(e.target.value)}
                        className="p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    >
                        <option value="all">All Grades</option>
                        {[...Array(10)].map((_, i) => (
                            <option key={i + 1} value={`${i + 1}`}>Standard {i + 1}</option>
                        ))}
                    </select>
                </div>
               
               
                {/* Grid layout for responsiveness */}
                <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">

                    {loading ? (
                        // Show loading spinner while fetching data
                        <div className="flex justify-center items-center h-screen">
                            <Loader className="animate-spin w-12 h-12 text-blue-500" />
                        </div>
                    ) :filteredStudents.length > 0 ? (
                        filteredStudents.map((student, index) => (
                            <div
                                key={index}
                                className="bg-white p-6 rounded-2xl border-2 border-black shadow-lg "
                            >

                                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                    {student.studentName}
                                </h3>
                                <p className="text-gray-600">👨‍👩‍👧 Parent: {student.parentName}</p>
                                <p className="text-gray-600">🎓 Grade: {student.grade}</p>
                                <p className="text-gray-600">📧 Email: {student.email}</p>
                                <p className="text-gray-600">📞 Mobile: {student.mobile}</p>
                                <button className="ml-auto mt-2 p-2 bg-black text-white rounded-full hover:bg-gray-800 transition flex items-center justify-center">
                                    <a href={`tel:${student.mobile}`} title="Call Parent">
                                        <PhoneCall className="w-5 h-5" />
                                    </a>
                                </button>

                            </div>
                        ))
                    ) : (

                      // 🚫 Show "No students found" message if no students in selected grade
                      <div className="flex flex-col items-center justify-center w-full p-6 bg-white shadow-md rounded-lg">
                      <AlertTriangle className="w-12 h-12 text-red-500 mb-3" />
                      <p className="text-gray-600 text-lg">
                          No students found for {selectedGrade === "all" ? "any grade" : `Standard ${selectedGrade}`}
                      </p>
                  </div>


                    )}

                </div>
            </div>
        </div>
    );
};

export default StudentList;
