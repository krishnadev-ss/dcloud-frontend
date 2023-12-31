import React from 'react';
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import styles from "@/app/mycloud/mycloud.module.css";
import Image from "next/image";
import Menu from "@/components/Menu/Menu";

const FileTable = ({
                       data,
                       downloadMenu,
                       shareMenu,
                       favoriteMenu,
                       deleteMenu,
                       removeShareMenu,
                       handleFileClick
                   }) => {

    return (
        <TableContainer>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableRow/>
                        <TableCell>File Name</TableCell>
                        <TableCell>File Type</TableCell>
                        <TableCell>File Size</TableCell>
                        <TableCell>Options</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data?.files?.map((file, index) => (
                        <TableRow key={index}>
                            <TableCell>
                                <div className={styles['longbutton-icon']}>
                                    {file.type === "image" &&
                                        <Image width={50} height={50} src="/mycloud/camerawhite.png"
                                               alt="image"/>}
                                    {file.type === "video" &&
                                        <Image width={50} height={50} src="/mycloud/videowhite.png"
                                               alt="image"/>}
                                    {file.type === "document" &&
                                        <Image width={50} height={50} src="/mycloud/documentswhite.png"
                                               alt="image"/>}
                                    {file.type === "audio" &&
                                        <Image width={50} height={50} src="/mycloud/audiowhite.png"
                                               alt="image"/>}
                                    {file.type === "other" &&
                                        <Image width={50} height={50} src="/mycloud/others.png"
                                               alt="image"/>}
                                </div>
                            </TableCell>
                            <TableCell>
                                <div onClick={() => handleFileClick(file)}>{file.name.slice(0, 20)}</div>
                            </TableCell>
                            <TableCell>{file.type}</TableCell>
                            <TableCell>{file.size}</TableCell>
                            <TableCell>
                                <Menu
                                    cid={file.cid}
                                    id={file._id}
                                    isFavorite={file.isFavorite}
                                    downloadMenu={downloadMenu}
                                    shareMenu={shareMenu}
                                    favoriteMenu={favoriteMenu}
                                    deleteMenu={deleteMenu}
                                    removeShareMenu={removeShareMenu}
                                />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>

    );
};

export default FileTable;
