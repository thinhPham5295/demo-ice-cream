package com.nashtech.icecream.service.util;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

public class FileUtil {
    private final Logger log = LoggerFactory.getLogger(FileUtil.class);

    private static FileUtil instance = null;

    private String uploadFolder = System.getProperty("user.dir") + "\\src\\main\\webapp\\content\\images\\upload\\";
//    private String uploadFolder = "\\content\\images\\upload\\";

    public static FileUtil getInstance() {
        if (instance == null) {
            instance = new FileUtil();
        }
        return instance;
    }

    public String getUrlFile(MultipartFile file) {
        return uploadFolder + file.getOriginalFilename();
    }

    public void storeFile(MultipartFile file, String urlFile) {
        InputStream input;
        Path path;
        OutputStream output;

        if (urlFile != null && file != null) {
            try {
                input = new ByteArrayInputStream(file.getBytes());
                path = Paths.get(urlFile);
                log.info("save file to : " + path.toString());
                if (!Files.exists(path.getParent())) {
                    Files.createDirectories(path.getParent());
                }
                output = new FileOutputStream(path.toFile());
                doCopy(input, output);
            } catch (IOException e) {
                if (log.isDebugEnabled()) {
                    e.printStackTrace();
                }
                log.error(e.getMessage());
            } catch (Throwable e) {
                if (log.isDebugEnabled()) {
                    e.printStackTrace();
                }
                log.error(e.getMessage());
            }
        }
    }

    private void doCopy(InputStream is, OutputStream os) throws IOException {
        byte[] bytes = new byte[64];
        int numBytes;
        while ((numBytes = is.read(bytes)) != -1) {
            os.write(bytes, 0, numBytes);
        }
        os.flush();
        os.close();
        is.close();
    }

    public String getUploadFolder() {
        return uploadFolder;
    }

}
