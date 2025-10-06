import Sidebar from '../components/Sidebar';
import DB_List_Card from '../components/dashboard/DB_List_Card';
import { GoUpload, GoFile, GoX } from 'react-icons/go';

// Sample data
const list = [
    { fileName: "Board Of Directors", date: "15/07/25", status: "Voted" },
    { fileName: "Contract Mergers", date: "22/07/25", status: "NOTA" },
    { fileName: "Board Of Directors", date: "12/07/25", status: "Voted" },
    { fileName: "Contract Mergers", date: "20/07/25", status: "NOTA" },
];

function Dashboard() {


    return (
        <div className="relative flex min-h-screen border border-transparent" style={{ fontFamily: 'montserrat' }}>
            {/* Sidebar */}
            <Sidebar name="Travis Scott" email="fein@gmail.com" />

            <div className="mt-28 md:mt-26 w-full flex flex-col">
                <div className='w-full md:px-9 px-4' style={{ fontFamily: 'Syne' }}>
                    <h1 className='text-4xl tracking-wide text-black font-extrabold'>Dashboard</h1>
                </div>

                {/* Document List */}
                <div className="w-full gap-4 md:gap-6 px-4 md:px-10 my-8 flex flex-col justify-center">
                    {list.map((item, index) => (
                        <DB_List_Card
                            key={index}
                            fileName={item.fileName}
                            type={item.type}
                            size={item.size}
                            date={item.date}
                            status={item.status}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
