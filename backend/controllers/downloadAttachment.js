import supabase from "../supabase.js";

export const downloadAttachment = async (req, res) => {
    try {
        const { id_complain } = req.params;
        const { file } = req.query;

        if (!id_complain || !file) {
            return res.status(400).json({
                message: "id_complain dan file wajib diisi"
            });
        }

        // Cari file berdasarkan complaint
        const { data: attachment, error: attachmentError } = await supabase
            .from("attachments")
            .select("id_complain, file")
            .eq("id_complain", id_complain)
            .eq("file", file)
            .single();

        if (attachmentError || !attachment) {
            console.error("ATTACHMENT NOT FOUND:", attachmentError);

            return res.status(404).json({
                message: "Attachment tidak ditemukan"
            });
        }

        // Ambil daftar file dari folder complaint
        const folderPath = `complaints/${id_complain}`;

        const { data: files, error: listError } = await supabase
            .storage
            .from("attachments")
            .list(folderPath);

        if (listError) {
            console.error("LIST STORAGE ERROR:", listError);

            return res.status(500).json({
                message: "Gagal mencari attachment",
                error: listError.message
            });
        }

        // Cari file yang nama akhirnya sesuai dengan nama original file
        const storageFile = files?.find(
            (item) => item.name.endsWith(`-${file}`)
        );

        if (!storageFile) {
            return res.status(404).json({
                message: "File tidak ditemukan di Storage"
            });
        }

        const filePath = `${folderPath}/${storageFile.name}`;

        // Download file dari Supabase Storage
        const { data: fileData, error: downloadError } = await supabase
            .storage
            .from("attachments")
            .download(filePath);

        if (downloadError) {
            console.error("STORAGE DOWNLOAD ERROR:", downloadError);

            return res.status(500).json({
                message: "Gagal mendownload file",
                error: downloadError.message
            });
        }

        // Tentukan nama file saat didownload
        res.setHeader(
            "Content-Disposition",
            `attachment; filename="${encodeURIComponent(file)}"`
        );

        res.setHeader(
            "Content-Type",
            fileData.type || "application/octet-stream"
        );

        const buffer = Buffer.from(await fileData.arrayBuffer());

        return res.send(buffer);

    } catch (error) {
        console.error("DOWNLOAD ATTACHMENT ERROR:", error);

        return res.status(500).json({
            message: "Internal server error",
            error: error.message
        });
    }
};