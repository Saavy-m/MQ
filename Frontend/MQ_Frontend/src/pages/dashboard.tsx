import { useState } from "react";
import axios from "axios";
import MarksComparisonChart from "./MarksComparisonChart";

export default function dashboard() {
  const [studentMarks, setStudentMarks] = useState({});
  const [maxMarks, setMaxMarks] = useState({
    Maths: 40,
    Science: 35,
    English: 50,
    Geography: 35,
    History: 35,
    Sports: 20,
  });

  const [mathsWeight, setMathsWeight] = useState<number>(0.1);
  const [scienceWeight, setScienceWeight] = useState<number>(0.1);
  const [englishWeight, setEnglishWeight] = useState<number>(0.3);
  const [GeographyWeight, setGeographyWeight] = useState<number>(0.3);
  const [historyWeight, sethistoryWeight] = useState<number>(0.3);
  const [riskweight, setriskweight] = useState<number>(0.3);
  const [sportsWeight, setSportsWeight] = useState<number>(0.3);

  // State for marks
  const [mathsMarks, setMathsMarks] = useState<number>(0);
  const [scienceMarks, setScienceMarks] = useState<number>(0);
  const [englishMarks, setEnglishMarks] = useState<number>(0);
  const [GeographyMarks, setGeographyhMarks] = useState<number>(0);
  const [historyMarks, setHistoryMarks] = useState<number>(0);
  const [householdIncome, setHouseholdIncome] = useState<number>(0);
  const [sportsMarks, setSportsMarks] = useState<number>(0);

  const [responseMessage, setResponseMessage] = useState<string>("");
  const [responseMessage_2, setResponseMessage_2] = useState<boolean>();
  const [risk, setRisk] = useState<number>(2);
  const [scholarshipAmount, setScholarshipAmount] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Payload to be sent to the backend
    const data = {
      weightings: {
        Maths: mathsWeight,
        Science: scienceWeight,
        English: englishWeight,
        Geography: GeographyWeight,
        History: historyWeight,
        "Household Income": riskweight,
        Sports: sportsWeight,
      },
      marks: {
        Maths: mathsMarks,
        Science: scienceMarks,
        English: englishMarks,
        Geography: GeographyMarks,
        History: historyMarks,
        "Household Income": householdIncome,
        Sports: sportsMarks,
      },
    };

    setStudentMarks({
      Maths: mathsMarks,
      Science: scienceMarks,
      English: englishMarks,
      Geography: GeographyMarks,
      History: historyMarks,
      Sports: sportsMarks,
    });

    try {
      const response: any = await axios.post(
        "http://127.0.0.1:5000/weights",
        data
      );
      const result = response.data;
      console.log(result.totalScore);
      setRisk(result.scholarshipRisk);

      if (
        mathsMarks < maxMarks.Maths ||
        scienceMarks < maxMarks.Science ||
        englishMarks < maxMarks.English ||
        sportsMarks < maxMarks.Sports ||
        GeographyMarks < maxMarks.Geography ||
        historyMarks < maxMarks.History
      ) {
        setResponseMessage_2(true);
      } else {
        setResponseMessage_2(false);
      }

      const Final_score = riskweight * risk * 10 + result.totalScore;

      if (Final_score <= 60 && Final_score > 40) {
        setScholarshipAmount("$ 2000");
        setResponseMessage("Prospect : Low");
      } else if (Final_score <= 75 && Final_score > 60) {
        setScholarshipAmount("$2500");
        setResponseMessage("Prospect : Average");
      } else if (Final_score <= 90 && Final_score > 75) {
        setScholarshipAmount("$ 4000");
        setResponseMessage("Prospect : Average");
      } else if (Final_score <= 95 && Final_score > 90) {
        setScholarshipAmount("$ 5000");
        setResponseMessage("Prospect : good");
      } else if (Final_score <= 100 && Final_score > 95) {
        setScholarshipAmount("$ 6000");
        setResponseMessage("Prospect : great");
      } else if (Final_score > 100) {
        setScholarshipAmount("$ 8000");
        setResponseMessage("Prospect : Awesome");
      } else {
        setScholarshipAmount("No Scholarship Awarded");
        setResponseMessage(" Prospect: Not Sufficient Data");
      }
      setIsModalOpen(true);
    } catch (error) {
      setResponseMessage("An error occurred. Please try again.");
      console.error(error);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-full">
      <nav className="bg-gray-800 w-full fixed z-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <img
                  className="h-8 w-8"
                  src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=500"
                  alt="Your Company"
                />
              </div>
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4">
                  <a
                    href="#"
                    className="rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white"
                    aria-current="page"
                  >
                    Dashboard
                  </a>
                  <a
                    href="#"
                    className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                  >
                    Team
                  </a>
                  <a
                    href="#"
                    className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                  >
                    Projects
                  </a>
                  <a
                    href="#"
                    className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                  >
                    Calendar
                  </a>
                  <a
                    href="#"
                    className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                  >
                    Reports
                  </a>
                </div>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="ml-4 flex items-center md:ml-6">
                <button
                  type="button"
                  className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                >
                  <span className="absolute -inset-1.5"></span>
                  <span className="sr-only">View notifications</span>
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    aria-hidden="true"
                    data-slot="icon"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"
                    />
                  </svg>
                </button>

                <div className="relative ml-3">
                  <div>
                    <button
                      type="button"
                      className="relative flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                      id="user-menu-button"
                      aria-expanded="false"
                      aria-haspopup="true"
                    >
                      <span className="absolute -inset-1.5"></span>
                      <span className="sr-only">Open user menu</span>
                      <img
                        className="h-8 w-8 rounded-full"
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                        alt=""
                      />
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="-mr-2 flex md:hidden">
              <button
                type="button"
                className="relative inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                aria-controls="mobile-menu"
                aria-expanded="false"
              >
                <span className="absolute -inset-0.5"></span>
                <span className="sr-only">Open main menu</span>
                <svg
                  className="block h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                  data-slot="icon"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>
                <svg
                  className="hidden h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                  data-slot="icon"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M6 18 18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div className="md:hidden" id="mobile-menu">
          <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
            <a
              href="#"
              className="block rounded-md bg-gray-900 px-3 py-2 text-base font-medium text-white"
              aria-current="page"
            >
              Dashboard
            </a>
            <a
              href="#"
              className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
            >
              Teams
            </a>
            <a
              href="#"
              className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
            >
              Projects
            </a>
            <a
              href="#"
              className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
            >
              Meta
            </a>
            <a
              href="#"
              className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
            >
              Reports
            </a>
          </div>
          <div className="border-t border-gray-700 pb-3 pt-4">
            <div className="flex items-center px-5">
              <div className="flex-shrink-0">
                <img
                  className="h-10 w-10 rounded-full"
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt=""
                />
              </div>
              <div className="ml-3">
                <div className="text-base font-medium leading-none text-white">
                  Tom Cook
                </div>
                <div className="text-sm font-medium leading-none text-gray-400">
                  tom@example.com
                </div>
              </div>
              <button
                type="button"
                className="relative ml-auto flex-shrink-0 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
              >
                <span className="absolute -inset-1.5"></span>
                <span className="sr-only">View notifications</span>
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                  data-slot="icon"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight mt-16 text-gray-900 font-outfit">
            Scholarship Prediction Model
          </h1>
        </div>
      </header>
      <main>
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          {/* <!-- Your content --> */}
          <div className="min-h-screen ">
            <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 ">
              <h2 className="text-2xl font-bold mb-6  text-slate-600 text-center font-outfit">
                Scholarship Weightings
              </h2>
              <form
                onSubmit={handleSubmit}
                className="space-y-4 space-x-4 mt-8"
              >
                <div className="flex justify-evenly">
                  <div>
                    <label
                      className="block text-gray-700 text-sm font-bold mr-4 text-center mb-2"
                      htmlFor="mathsWeight"
                    >
                      Maths
                    </label>
                    <input
                      id="mathsWeight"
                      type="number"
                      value={mathsWeight}
                      step="0.1"
                      onChange={(e) => setMathsWeight(Number(e.target.value))}
                      className="text-center shadow appearance-none border rounded-full w-5/6 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                  </div>

                  <div>
                    <label
                      className="block text-gray-700 text-sm text-center mr-6 font-bold mb-2"
                      htmlFor="scienceWeight"
                    >
                      Science
                    </label>
                    <input
                      id="scienceWeight"
                      type="number"
                      value={scienceWeight}
                      step="0.1"
                      onChange={(e) => setScienceWeight(Number(e.target.value))}
                      className="text-center shadow appearance-none border rounded-full w-5/6 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                  </div>

                  <div>
                    <label
                      className="block text-gray-700 text-sm text-center mr-6 font-bold mb-2"
                      htmlFor="englishWeight"
                    >
                      English
                    </label>
                    <input
                      id="englishWeight"
                      type="number"
                      value={englishWeight}
                      step="0.1"
                      onChange={(e) => setEnglishWeight(Number(e.target.value))}
                      className="text-center shadow appearance-none border rounded-full w-5/6 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                  </div>

                  <div>
                    <label
                      className="block text-gray-700 text-sm text-center mr-6 font-bold mb-2"
                      htmlFor="englishWeight"
                    >
                      Geography
                    </label>
                    <input
                      id="geographyWeight"
                      type="number"
                      value={GeographyWeight}
                      step="0.1"
                      onChange={(e) =>
                        setGeographyWeight(Number(e.target.value))
                      }
                      className="text-center shadow appearance-none border rounded-full w-5/6 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                  </div>

                  <div>
                    <label
                      className="block text-gray-700 text-sm text-center mr-6 font-bold mb-2"
                      htmlFor="englishWeight"
                    >
                      History
                    </label>
                    <input
                      id="historyWeight"
                      type="number"
                      value={historyWeight}
                      step="0.1"
                      onChange={(e) => sethistoryWeight(Number(e.target.value))}
                      className="text-center shadow appearance-none border rounded-full w-5/6 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                  </div>

                  <div>
                    <label
                      className="block text-gray-700 text-sm font-bold text-center mr-6 mb-2"
                      htmlFor="sportsWeight"
                    >
                      Sports
                    </label>
                    <input
                      id="sportsWeight"
                      type="number"
                      value={sportsWeight}
                      step="0.1"
                      onChange={(e) => setSportsWeight(Number(e.target.value))}
                      className="text-center shadow appearance-none border rounded-full w-5/6 py-2 px-3 mb-6 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                  </div>
                </div>
                <h2 className="text-xl font-bold mt-6 mb-6 text-slate-600 text-center font-outfit">
                  Marks Scored in High School / Required Marks
                </h2>
                <div className="flex items-center justify-center gap-8">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="mathsMarks"
                  >
                    Math
                  </label>
                  <input
                    id="mathsMarks"
                    type="number"
                    value={mathsMarks}
                    onChange={(e) => setMathsMarks(Number(e.target.value))}
                    className="shadow ml-10 appearance-none border rounded-full w-1/3 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                  /
                  <input
                    id="Required_mathsMarks"
                    type="number"
                    value={maxMarks.Maths}
                    onChange={(e) =>
                      setMaxMarks((prevMarks) => ({
                        ...prevMarks,
                        Maths: Number(e.target.value), // Update only the Maths field
                      }))
                    }
                    className="shadow ml-10 appearance-none border rounded-full w-1/6 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </div>

                <div className="flex items-center justify-center gap-8">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="scienceMarks"
                  >
                    Science
                  </label>
                  <input
                    id="scienceMarks"
                    type="number"
                    value={scienceMarks}
                    onChange={(e) => setScienceMarks(Number(e.target.value))}
                    className="shadow ml-6 appearance-none border rounded-full w-1/3 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                  /
                  <input
                    id="Required_scienceMarks"
                    type="number"
                    value={maxMarks.Science}
                    onChange={(e) =>
                      setMaxMarks((prevMarks) => ({
                        ...prevMarks,
                        Science: Number(e.target.value), // Update only the Maths field
                      }))
                    }
                    className="shadow ml-10 appearance-none border rounded-full w-1/6 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </div>

                <div className="flex items-center justify-center gap-8">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="englishMarks"
                  >
                    English
                  </label>
                  <input
                    id="englishMarks"
                    type="number"
                    value={englishMarks}
                    onChange={(e) => setEnglishMarks(Number(e.target.value))}
                    className="shadow ml-7 appearance-none border rounded-full w-1/3 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                  /
                  <input
                    id="Required_englishMarks"
                    type="number"
                    value={maxMarks.English}
                    onChange={(e) =>
                      setMaxMarks((prevMarks) => ({
                        ...prevMarks,
                        English: Number(e.target.value), // Update only the Maths field
                      }))
                    }
                    className="shadow ml-10 appearance-none border rounded-full w-1/6 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </div>

                <div className="flex items-center justify-center gap-8">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="sportsMarks"
                  >
                    Sports
                  </label>
                  <input
                    id="sportsMarks"
                    type="number"
                    value={sportsMarks}
                    onChange={(e) => setSportsMarks(Number(e.target.value))}
                    className="shadow ml-8 appearance-none border rounded-full w-1/3 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                  /
                  <input
                    id="Required_SportsMarks"
                    type="number"
                    value={maxMarks.Sports}
                    onChange={(e) =>
                      setMaxMarks((prevMarks) => ({
                        ...prevMarks,
                        Sports: Number(e.target.value), // Update only the Maths field
                      }))
                    }
                    className="shadow ml-10 appearance-none border rounded-full w-1/6 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </div>

                <div className="flex items-center justify-center gap-8">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="sportsMarks"
                  >
                    Geography
                  </label>
                  <input
                    id="geographyMarks"
                    type="number"
                    value={GeographyMarks}
                    onChange={(e) => setGeographyhMarks(Number(e.target.value))}
                    className="shadow appearance-none border rounded-full w-1/3 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                  /
                  <input
                    id="Required_geographyMarks"
                    type="number"
                    value={maxMarks.Geography}
                    onChange={(e) =>
                      setMaxMarks((prevMarks) => ({
                        ...prevMarks,
                        Geography: Number(e.target.value), // Update only the Maths field
                      }))
                    }
                    className="shadow ml-10 appearance-none border rounded-full w-1/6 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </div>

                <div className="flex items-center justify-center gap-8">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="sportsMarks"
                  >
                    History
                  </label>
                  <input
                    id="historyMarks"
                    type="number"
                    value={historyMarks}
                    onChange={(e) => setHistoryMarks(Number(e.target.value))}
                    className="shadow ml-6 appearance-none border rounded-full w-1/3 py-2 px-3 mb-6 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                  /
                  <input
                    id="Required_historyMarks"
                    type="number"
                    value={maxMarks.History}
                    onChange={(e) =>
                      setMaxMarks((prevMarks) => ({
                        ...prevMarks,
                        History: Number(e.target.value), // Update only the Maths field
                      }))
                    }
                    className="shadow ml-10 appearance-none border rounded-full w-1/6 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </div>

                <h2 className="text-xl font-bold mt-6 mb-6 text-slate-600 text-center font-outfit ">
                  Household Income
                </h2>

                <div className="flex items-center justify-center gap-8">
                  {/* <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="householdIncome"
                  >
                    House Income
                  </label> */}
                  <input
                    id="householdIncome"
                    type="number"
                    value={householdIncome}
                    onChange={(e) => setHouseholdIncome(Number(e.target.value))}
                    className="shadow appearance-none border rounded-full w-1/3 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </div>

                <h2 className="text-xl font-bold mt-12 mb-6 text-slate-600 text-center font-outfit ">
                  Risk Factor
                </h2>

                <div className="flex items-center justify-center gap-8">
                  {/* <label
                    className="block text-gray-700 text-sm font-bold text-center mb-2"
                    htmlFor="riskweight"
                  >
                    Household Income
                  </label> */}
                  <input
                    id="riskweight"
                    type="number"
                    value={riskweight}
                    step="0.1"
                    onChange={(e) => setriskweight(Number(e.target.value))}
                    className=" shadow appearance-none border rounded-full w-1/3 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </div>
                <div className="flex items-center justify-center">
                  <button
                    type="submit"
                    className="bg-black text-white hover:text-white hover:bg-black transition-transform duration-300 ease-in-out hover:scale-110 font-bold py-2 px-4 mt-4 rounded-full  focus:outline-none focus:shadow-outline"
                  >
                    Submit
                  </button>
                </div>
              </form>
              {isModalOpen && (
                <div className="fixed bg-gray-900 bg-opacity-50 backdrop-blur-sm z-10 inset-0 overflow-y-auto">
                  <div className="flex items-center justify-center min-h-screen">
                    <div className="bg-white rounded-lg shadow-xl p-6 max-w-lg w-full">
                      <h1 className="text-3xl font-extrabold mb-4 text-black text-center">
                        SCHOLARSHIP RESULTS
                      </h1>
                      <p className="text-lg text-center mb-4 font-outfit">
                        Student can receive a scholarship upto :
                      </p>
                      <h2 className="text-xl font-bold text-center text-slate-500 font-outfit">
                        {scholarshipAmount}
                      </h2>
                      <p className="text-lg text-center mb-4 mt-4 font-outfit">
                        {responseMessage}
                      </p>
                      <h1 className="text-xl mb-4 mt-12 text-center font-bold">
                        Student Marks Analysis
                      </h1>
                      {responseMessage_2 ? (
                        <div>
                          <p className="text-lg text-center text-red-700 mb-4 mt-4 font-outfit">
                            Required Marks Criteria Failed
                          </p>
                        </div>
                      ) : (
                        <div>
                          <p className="text-lg text-center text-green-700 mb-4 mt-4 font-outfit">
                            Required Marks Criteria Passed
                          </p>
                        </div>
                      )}

                      <MarksComparisonChart
                        studentMarks={studentMarks}
                        maxMarks={maxMarks}
                      />
                      <div className="mt-6 flex justify-center">
                        <button
                          onClick={closeModal}
                          className="bg-black text-white hover:text-white hover:bg-black transition-transform duration-300 ease-in-out hover:scale-110 font-bold py-2 px-4 mt-4 rounded-full  focus:outline-none focus:shadow-outline"
                        >
                          Close
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
