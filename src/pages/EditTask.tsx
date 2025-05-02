import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const EditTask = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [task, setTask] = useState({
        title: "",
        description: "",
        deadline: "",
        status: "belum",
    });

    useEffect(() => {
        fetchTask();
    }, []);

    const fetchTask = async () => {
        try {
            const res = await api.get(`/tasks/${id}`);
            setTask(res.data);
        } catch (err) {
            alert("Gagal mengambil data tugas");
        }
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        setTask({ ...task, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await api.patch(`/tasks/${id}`, task);
            alert("Tugas berhasil diperbarui");
            navigate("/dashboard");
        } catch (err) {
            alert("Gagal memperbarui tugas");
        }
    };

    return (
        <div className="min-h-screen bg-gray-100">
            {/* ✅ Navbar reusable */}
            <Navbar />

            {/* Form */}
            <div className="flex items-center justify-center px-4 pt-8">
                <div className="bg-white rounded-xl shadow-xl p-8 w-full max-w-xl">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Edit Tugas</h2>
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Judul</label>
                            <input
                                name="title"
                                type="text"
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={task.title}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Deskripsi</label>
                            <textarea
                                name="description"
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={task.description}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Deadline</label>
                            <input
                                name="deadline"
                                type="date"
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={task.deadline}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                            <select
                                name="status"
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={task.status}
                                onChange={handleChange}
                            >
                                <option value="belum">Belum</option>
                                <option value="selesai">Selesai</option>
                            </select>
                        </div>

                        <div className="flex justify-end gap-4">
                            <button
                                type="submit"
                                className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition"
                            >
                                Simpan Perubahan
                            </button>
                            <button
                                type="button"
                                className="bg-gray-300 text-gray-800 px-6 py-2 rounded-lg hover:bg-gray-400 transition"
                                onClick={() => navigate("/dashboard")}
                            >
                                Batal
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default EditTask;
