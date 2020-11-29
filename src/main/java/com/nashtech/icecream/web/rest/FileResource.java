package com.nashtech.icecream.web.rest;

import com.nashtech.icecream.service.FileService;
import com.nashtech.icecream.service.dto.ImageDTO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api")
public class FileResource {
    private final Logger log = LoggerFactory.getLogger(FileResource.class);

    @Autowired
    private FileService fileService;

    @PostMapping("/v1/files/upload")
    public ResponseEntity<ImageDTO> uploadFile(@RequestPart(value = "file") MultipartFile file) {
        log.debug("REST request to upload file MedicalService : {}");
        String path = fileService.uploadFile(file);
        ImageDTO imageDTO = new ImageDTO();
        imageDTO.setName(path);
        return ResponseEntity.ok().body(imageDTO);
    }
}
