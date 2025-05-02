import { useEffect, useState, useContext } from "react";
import api from "../services/api";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Dashboard = () => {
    const [tasks, setTasks] = useState([]);
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (user) fetchTasks();
    }, [user]);

    const fetchTasks = async () => {
        try {
            const res = await api.get("/tasks");
            setTasks(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const markAsDone = async (id: number) => {
        await api.patch(`/tasks/${id}`, { status: "selesai" });
        fetchTasks();
    };

    const deleteTask = async (id: number) => {
        await api.delete(`/tasks/${id}`);
        fetchTasks();
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar />
            <div className="max-w-4xl mx-auto mt-10 px-4">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-4xl text-gray-700 font-bold">Daftar Tugas</h1>
                    <button
                        onClick={() => navigate("/add-task")}
                        className="bg-green-600 hover:bg-purple-400 font-mono text-white px-4 py-2 rounded hover:bg-blue-700"
                    >
                        Tambah Tugas Baru
                    </button>
                </div>

                {tasks.length === 0 ? (
                    <p>Tidak ada tugas.</p>
                ) : (
                    <ul className="space-y-4">
                        {tasks.map((task: any) => (
                            <li key={task.id} className="bg-white shadow p-4 rounded flex justify-between items-start">
                                <div>
                                    <h2 className="text-lg font-semibold">{task.title}</h2>
                                    <p className="text-gray-600">{task.description}</p>
                                    <p className="text-sm text-gray-500">Deadline: {task.deadline}</p>
                                    <p className="text-sm font-medium">
                                        Status:{" "}
                                        <span className={task.status === "selesai" ? "text-green-600" : "text-red-600"}>
                                            {task.status}
                                        </span>
                                    </p>
                                </div>
                                <div className="flex flex-col gap-2 ml-4">
                                    <button onClick={() => navigate(`/edit-task/${task.id}`)} className="text-blue-500 hover:underline">
                                        Edit
                                    </button>
                                    <button onClick={() => deleteTask(task.id)} className="text-red-500 hover:underline">
                                        Hapus
                                    </button>
                                    {task.status === "belum" && (
                                        <button onClick={() => markAsDone(task.id)} className="text-green-600 hover:underline">
                                            Tandai Selesai
                                        </button>
                                    )}
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            <Footer />
        </div>
    );
};

export default Dashboard;
