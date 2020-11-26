package com.nashtech.icecream.service.impl;

import com.nashtech.icecream.service.FileService;
import com.nashtech.icecream.service.util.FileUtil;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class FileServiceImpl implements FileService {

    @Override
    public String uploadFile(MultipartFile file) {
        String urlFile = FileUtil.getInstance().getUrlFile(file);
        FileUtil.getInstance().storeFile(file, urlFile);
        return urlFile;
    }
}
