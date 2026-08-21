import supabase from "../supabase.js";

export const submitComplain = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, category } = req.body;
        const files = req.files || [];

        // =========================
        // VALIDASI
        // =========================

        if (!name || !description || !category) {
            return res.status(400).json({
                message: "name, description, dan category wajib diisi"
            });
        }

        // =========================
        // CEK COMPLAINT
        // =========================

        const { data: complain, error: findError } = await supabase
            .from("complain")
            .select("id_complain, number, generate_at, status")
            .eq("id_complain", id)
            .eq("status", "draft")
            .single();

        if (findError || !complain) {
            console.error("FIND COMPLAINT ERROR:", findError);

            return res.status(404).json({
                message: "CMP tidak ditemukan atau sudah disubmit"
            });
        }

        // =========================
        // UPDATE COMPLAINT
        // =========================

        const submittedAt = new Date().toISOString();

        const { data, error } = await supabase
            .from("complain")
            .update({
                name,
                description,
                category,
                status: "Pending",
                submitted_at: submittedAt
            })
            .eq("id_complain", id)
            .eq("status", "draft")
            .select()
            .single();

        if (error) {
            console.error("UPDATE COMPLAINT ERROR:", error);

            return res.status(500).json({
                message: "Gagal submit complaint",
                error: error.message
            });
        }

        // =========================
        // UPLOAD ATTACHMENTS
        // =========================

        const attachments = [];

        for (const file of files) {

            const filePath =
                `complaints/${id}/${Date.now()}-${file.originalname}`;

            // Upload file ke Supabase Storage
            const { error: uploadError } = await supabase
                .storage
                .from("attachments")
                .upload(filePath, file.buffer, {
                    contentType: file.mimetype,
                    upsert: false
                });

            if (uploadError) {
                console.error("UPLOAD ERROR:", uploadError);

                return res.status(500).json({
                    message: `Gagal upload file ${file.originalname}`,
                    error: uploadError.message
                });
            }

            // Simpan metadata ke tabel Attachments
            const { data: attachment, error: attachmentError } =
                await supabase
                    .from("attachments")
                    .insert({
                        id_complain: id,
                        file: file.originalname
                    })
                    .select()
                    .single();

            if (attachmentError) {
                console.error("ATTACHMENT DB ERROR:", attachmentError);

                return res.status(500).json({
                    message: `Gagal menyimpan attachment ${file.originalname}`,
                    error: attachmentError.message
                });
            }

            attachments.push({
                ...attachment,
                path: filePath
            });
        }

        // =========================
        // GENERATE CMP CODE
        // =========================

        const CMPCode =
            `CMP-${data.generate_at.replaceAll("-", "")}-${String(data.number).padStart(3, "0")}`;

        // =========================
        // RESPONSE
        // =========================

        return res.status(200).json({
            message: "Complaint berhasil disubmit",

            data: {
                ...data,
                cmp_code: CMPCode,
                attachments
            }
        });

    } catch (error) {
        console.error("SUBMIT COMPLAINT ERROR:", error);

        return res.status(500).json({
            message: "Internal server error",
            error: error.message
        });
    }
};

