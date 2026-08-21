import supabase from "../supabase.js";

export const trackComplain = async (req, res) => {
    try {
        const { cpm_code } = req.body;

        console.log("TRACK REQUEST:", req.body);

        if (!cpm_code) {
            return res.status(400).json({
                message: "Kode CMP wajib diisi"
            });
        }

        // Contoh:
        // CMP-20260818-001
        const parts = cpm_code.trim().split("-");

        if (parts.length !== 3 || parts[0].toUpperCase() !== "CMP") {
            return res.status(400).json({
                message: "Format kode CMP tidak valid"
            });
        }

        const dateString = parts[1];
        const numberString = parts[2];

        // Validasi tanggal: 20260818
        if (!/^\d{8}$/.test(dateString)) {
            return res.status(400).json({
                message: "Format tanggal CMP tidak valid"
            });
        }

        // Validasi nomor: 001
        if (!/^\d+$/.test(numberString)) {
            return res.status(400).json({
                message: "Nomor CMP tidak valid"
            });
        }

        // 20260818 -> 2026-08-18
        const generateAt =
            `${dateString.substring(0, 4)}-` +
            `${dateString.substring(4, 6)}-` +
            `${dateString.substring(6, 8)}`;

        const number = Number(numberString);

        console.log("SEARCH:");
        console.log("generate_at:", generateAt);
        console.log("number:", number);

        // Cari berdasarkan generate_at + number
        const { data: complaint, error } = await supabase
            .from("complain")
            .select(`
                id_complain,
                number,
                generate_at,
                name,
                category,
                status,
                submitted_at,
                processing_at,
                completed_at
            `)
            .eq("generate_at", generateAt)
            .eq("number", number)
            .neq("status", "draft")
            .maybeSingle();

        if (error) {
            console.error("TRACK SUPABASE ERROR:", error);

            return res.status(500).json({
                message: "Gagal mengambil data complaint",
                error: error.message
            });
        }

        if (!complaint) {
            return res.status(404).json({
                message: "CMP tidak ditemukan"
            });
        }

        const CMPCode =
            `CMP-${dateString}-${String(number).padStart(3, "0")}`;

        return res.status(200).json({
            message: "Data tracking berhasil ditemukan",

            data: {
                id_complain: complaint.id_complain,
                cpm_code: CMPCode,

                name: complaint.name,
                category: complaint.category,
                status: complaint.status,

                submitted_at: complaint.submitted_at,
                processing_at: complaint.processing_at,
                completed_at: complaint.completed_at
            }
        });

    } catch (error) {
        console.error("TRACK COMPLAINT ERROR:", error);

        return res.status(500).json({
            message: "Internal server error",
            error: error.message
        });
    }
};