import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const AddTask = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [deadline, setDeadline] = useState("");
    const [status, setStatus] = useState("belum");

    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const taskData = { title, description, deadline, status };
        console.log("Mengirim tugas:", taskData);

        try {
            await api.post("/tasks", taskData);
            alert("Tugas berhasil ditambahkan");
            navigate("/dashboard");
        } catch (err: any) {
            console.error("Gagal kirim:", err.response?.data || err.message);
            alert("Gagal menambahkan tugas");
        }
    };

    return (
        <div className="min-h-screen bg-gray-100">
            {/* ✅ Navbar reusable */}
            <Navbar />

            {/* Form */}
            <div className="flex items-center justify-center px-4 pt-8">
                <div className="bg-white rounded-xl shadow-xl p-8 w-full max-w-xl">
                    <h2 className="text-2xl font-bold text-gray-700 mb-6">Tambah Tugas Baru</h2>
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Judul</label>
                            <input
                                name="title"
                                type="text"
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Deskripsi</label>
                            <textarea
                                name="description"
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Deadline</label>
                            <input
                                name="deadline"
                                type="date"
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={deadline}
                                onChange={(e) => setDeadline(e.target.value)}
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                            <select
                                name="status"
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                            >
                                <option value="belum">Belum</option>
                                <option value="selesai">Selesai</option>
                            </select>
                        </div>

                        <div className="flex justify-end gap-4">
                            <button
                                type="submit"
                                className="bg-green-600 text-white hover:bg-purple-700 px-6 py-2 rounded-lg hover:bg-blue-700 transition"
                            >
                                Simpan
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

export default AddTask;
