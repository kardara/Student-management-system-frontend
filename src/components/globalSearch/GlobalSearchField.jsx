import { Search } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { globalSearchService } from '../../services/globalSearchService';
import { useAuth } from '../../contexts/AuthContext';
import { toast } from 'react-toastify';
import RenderStudentSearch from './RenderStudentSearch';
import RenderTeacherSearch from './RenderTeacherSearch';
import RenderSemesterSearch from './RenderSemesterSearch';
import RenderOfferedCourseSearch from './RenderOfferedCourseSearch';
import RenderAcademicUnitSearch from './RenderAcademicUnitSearch';
import RenderCourseSearch from './RenderCourseSearch';
import RenderFeeSearch from './RenderFeeSearch';
import RenderRegistrationSearch from './RenderRegistrationSearch';

export default function GlobalSearchField() {
    const [hideSearch, setHideSearch] = useState(false);
    const [search, setSearch] = useState("");

    const [globalData, setGLobalData] = useState();
    const [searchResult, setSearchResult] = useState();
    const [properties, setProperties] = useState();
    const [loading, setLoading] = useState(true);

    const rendererObject = {
        // "academicUnits": <RenderAcademicUnitSearch data={searchResult?.academicUnits} />,
        // "attendances": "Attendances",
        "courses": <RenderCourseSearch data={searchResult?.courses} />,
        "fees": <RenderFeeSearch data={searchResult?.fees} />,
        "offeredCourses": <RenderOfferedCourseSearch data={searchResult?.offeredCourses} />,
        // "payments": "Payments",
        "registrations": <RenderRegistrationSearch data={searchResult?.registrations} />,
        "semesters": <RenderSemesterSearch data={searchResult?.semesters} />,
        // "staffs": "Staffs",
        "students": <RenderStudentSearch data={searchResult?.students} />,
        "teachers": <RenderTeacherSearch data={searchResult?.teachers} />,
    }

    const globalFilter = {
        academicUnits: function (arr, search) {
            return arr.filter(el => el.name.concat(el.code).toLowerCase().includes(search.toLowerCase()));
        },
        courses: function (arr, search) {
            return arr.filter(el => el.name.concat(el.description, el.code, el.academicUnit.code, el.academicUnit.name).toLowerCase().includes(search.toLowerCase()));
        },
        fees: function (arr, search) {
            return arr.filter(el => el.student.firstName.concat(el.student.lastName, el.student.email, el.student.phone, el.student.status, el.student.department.code, el.student.department.name).toLowerCase().includes(search.toLowerCase()));
        },
        offeredCourses: function (arr, search) {
            return arr.filter(el => el.course.name.concat(el.course.code, el.course.academicUnit.code, el.course.academicUnit.name).toLowerCase().includes(search.toLowerCase()));
        },

        registrations: function (arr, search) {
            return arr.filter(el => el.student.firstName.concat(el.student.lastName, el.student.email, el.student.phone, el.student.status, el.student.department.code, el.student.department.name, el.courses.map(c => c.name).join("")).toLowerCase().includes(search.toLowerCase()));
        },

        semesters: function (arr, search) {
            return arr.filter(el => el.name.concat(el.year).toLowerCase().includes(search.toLowerCase()));
        },
        staffs: function (arr, search) {
            return arr.filter(el => el.firstName.concat(el.lastName, el.email, el.phone, el.role).toLowerCase().includes(search.toLowerCase()));
        },
        students: function (arr, search) {
            return arr.filter(el => el.firstName.concat(el.lastName, el.email, el.phone, el.status, el.department.code, el.department.name).toLowerCase().includes(search.toLowerCase()));
        },

        teachers: function (arr, search) {
            return arr.filter(el => el.firstName.concat(el.lastName, el.email, el.phone, el.role, el.qualification).toLowerCase().includes(search.toLowerCase()));
        },
    }

    const authUser = useAuth();

    const updateProparties = (obj) => {
        const keys = Object.keys(obj);
        const temp = [];
        keys.forEach(key => { if (obj[key] && obj[key]?.length > 0) temp.push(key); })
        
        setProperties(temp);
    }

    const makeSearch = () => {
        const result = {};
        console.log(properties)
        properties.forEach(prop => {
            if (prop == "attendances" || prop == "payments") return;
            result[prop] = globalFilter[prop](globalData[prop], search);
            console.log(result);
        })
        properties.sort((b, a)=> result[a]?.length - result[b]?.length);
        setProperties(properties);

        setSearchResult(result);
    }

    useEffect(() => {
        switch (authUser.user.role) {
            case "ADMIN":
                globalSearchService.getAdmin()
                    .then((data) => {
                        setGLobalData(data); console.log(data)
                    }).catch(() => {
                        toast.error("An error occured", { theme: localStorage.getItem('theme'), position: "top-center" });
                    }).finally(() => {
                        setLoading(false);
                    })
                break;
            case "STUDENT":
                globalSearchService.getStudent(authUser.user.id)
                    .then((data) => {
                        setGLobalData(data); console.log(data)
                    }).catch(() => {
                        toast.error("An error occured", { theme: localStorage.getItem('theme'), position: "top-center" });
                    }).finally(() => {
                        setLoading(false);
                    });
                break;
            default:
                break;
        }
    }, [])

    useEffect(() => {
        if (globalData) {
            updateProparties(globalData);
        }

        if (properties) {
            makeSearch();
        }
    }, [search, globalData])

    return (
        <div className="relative w-full max-w-md">
            {/* Search Input Container */}
            <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400 transition-colors duration-200" />
                </div>
                
                <input 
                    type="search" 
                    name="Search" 
                    placeholder="Search everything..." 
                    className="w-full pl-12 pr-4 py-3 bg-bg-light dark:bg-bg-dark border-2 border-border-light dark:border-border-dark rounded-xl text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:border-accent-light dark:focus:border-accent-dark focus:ring-2 focus:ring-accent-light/20 dark:focus:ring-accent-dark/20 focus:outline-none transition-all duration-200 shadow-sm hover:shadow-md focus:shadow-lg"
                    value={search} 
                    onChange={(e) => setSearch(e.target.value)} 
                    onFocus={() => setHideSearch(true)} 
                    onBlur={() => setHideSearch(false)}
                />
                
                {/* Search Icon Animation */}
                {search && (
                    <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
                        <div className="w-2 h-2 bg-accent-light dark:bg-accent-dark rounded-full animate-pulse"></div>
                    </div>
                )}
            </div>

            {/* Search Results Dropdown */}
            {search && (
                <div className="absolute top-full left-0 right-0 mt-2 z-50">
                    <div className="w-full min-w-[600px] max-w-4xl bg-bg-secondary-light dark:bg-bg-secondary-dark border border-border-light dark:border-border-dark rounded-xl shadow-2xl overflow-hidden backdrop-blur-sm">
                        {/* Header */}
                        <div className="px-6 py-4 border-b border-border-light dark:border-border-dark bg-gradient-to-r from-accent-light/5 to-accent-dark/5">
                            <div className="flex items-center justify-between">
                                <h3 className="font-bold text-lg text-gray-900 dark:text-gray-100 flex items-center gap-2">
                                    <div className="w-2 h-2 bg-accent-light dark:bg-accent-dark rounded-full"></div>
                                    Search Results
                                </h3>
                                <div className="text-sm text-gray-500 dark:text-gray-400 bg-bg-light dark:bg-bg-dark px-3 py-1 rounded-full">
                                    {properties?.reduce((total, prop) => total + (searchResult?.[prop]?.length || 0), 0)} results
                                </div>
                            </div>
                        </div>

                        {/* Results Container */}
                        <div className="max-h-[500px] overflow-y-auto custom-scrollbar">
                            <div className="p-4 space-y-4">
                                {properties?.length > 0 ? (
                                    properties.map((prop, id) => (
                                        <div key={id} className="search-result-section">
                                            {rendererObject[prop]}
                                        </div>
                                    ))
                                ) : (
                                    <div className="p-8 text-center">
                                        <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
                                            <Search className="w-8 h-8 text-gray-400" />
                                        </div>
                                        <h3 className="text-lg font-medium text-gray-500 dark:text-gray-400 mb-2">No results found</h3>
                                        <p className="text-sm text-gray-400 dark:text-gray-500">
                                            Try adjusting your search terms or check the spelling
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Footer */}
                        {properties?.length > 0 && (
                            <div className="px-6 py-3 bg-bg-light dark:bg-bg-dark border-t border-border-light dark:border-border-dark">
                                <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                                    <span>Press ESC to close</span>
                                    <div className="flex items-center gap-2">
                                        <span>Powered by</span>
                                        <div className="w-1 h-1 bg-accent-light dark:bg-accent-dark rounded-full"></div>
                                        <span className="font-medium text-accent-light dark:text-accent-dark">Global Search</span>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Custom Scrollbar Styles */}
            <style jsx>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 6px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: var(--accent-light);
                    border-radius: 3px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: var(--accent-dark);
                }
            `}</style>
        </div>
    )
}