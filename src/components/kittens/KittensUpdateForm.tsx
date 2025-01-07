import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { CustomSelect, CustomSelectString } from '../ui/Select';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import { Button, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import {
    BreedsType,
    ColorsType,
    MediaDTO,
    KittenDetailType,
    ParentCatsType,
} from '@/types/types';
import Modal from '../ui/Modal';
import { FileUploadButton } from '../ui/Button';
import CloseIcon from '@mui/icons-material/Close';

interface KittensUpdateFormProps {
    handleUpdateKitten: (kittenId: number, formData: FormData) => void;
    initialData?: KittenDetailType;
}

const KittensUpdateForm: React.FC<KittensUpdateFormProps> = ({
    handleUpdateKitten,
    initialData,
}) => {
    const allowedTranStates = ['募集中', '商談中', '譲渡済'];
    const [kittenId, setKittenId] = useState<number>(0);
    const [fatherCatId, setFatherCatId] = useState<number>(0);
    const [motherCatId, setMotherCatId] = useState<number>(0);
    const [breedId, setBreedId] = useState<number>(0);
    const [colorId, setColorId] = useState<number>(0);
    const [sex, setSex] = useState<number>(0);
    const [birthDate, setBirthDate] = useState<Dayjs | null>(null);
    const [description, setDescription] = useState<string>('');
    const [price, setPrice] = useState<number>(0);
    const [tranState, setTranState] = useState<string>('');
    const [imageUrls, setImageUrls] = useState<MediaDTO[]>([]);
    const [videoUrls, setVideoUrls] = useState<MediaDTO[]>([]);
    const [maleCats, setMaleCats] = useState<ParentCatsType[]>([]);
    const [femaleCats, setFemaleCats] = useState<ParentCatsType[]>([]);
    const [breeds, setBreeds] = useState<BreedsType[]>([]);
    const [colors, setColors] = useState<ColorsType[]>([]);
    const [isImageModalOpen, setIsImageModalOpen] = useState(false);
    const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState<MediaDTO | null>(null);
    const [selectedVideo, setSelectedVideo] = useState<MediaDTO | null>(null);
    const [deleteImages, setDeleteImages] = useState<MediaDTO[] | null>(null);
    const [deleteVideos, setDeleteVideos] = useState<MediaDTO[] | null>(null);
    const [uploadedImages, setUploadedImages] = useState<File[]>([]);
    const [uploadedVideos, setUploadedVideos] = useState<File[]>([]);
    const [errors, setErrors] = useState({
        fatherCatId: false,
        motherCatId: false,
        breedId: false,
        colorId: false,
        sex: false,
        birthDate: false,
        description: false,
        price: false,
        tranState: false,
        imageUrls: false,
        videoUrls: false,
    });

    useEffect(() => {
        console.log(initialData);
        if (initialData) {
            setKittenId(initialData.kittenId || 0);
            setFatherCatId(initialData.fatherCatId || 0);
            setMotherCatId(initialData.motherCatId || 0);
            setBreedId(initialData.breedId || 0);
            setColorId(initialData.colorId || 0);
            setSex(initialData.sex || 0);
            setBirthDate(
                initialData.birthDate ? dayjs(initialData.birthDate) : null
            );
            setDescription(initialData.description || '');
            setPrice(initialData.price || 0);
            setTranState(initialData.tranState || '');
            setImageUrls(initialData.imageUrls);
            setVideoUrls(initialData.videoUrls);
        }
    }, [initialData]);

    useEffect(() => {
        const fetchParentCats = async () => {
            try {
                const response = await fetch(
                    `${process.env.NEXT_PUBLIC_API_BASE_URL}/parent`
                );
                if (!response.ok) {
                    throw new Error('Failed to fetch parent cats');
                }
                const data: ParentCatsType[] = await response.json();

                // オスとメスに分ける
                const males = data.filter((cat) => cat.sex === 0);
                const females = data.filter((cat) => cat.sex === 1);

                setMaleCats(males);
                setFemaleCats(females);
            } catch (error) {
                console.error('親猫一覧の取得に失敗しました', error);
            }
        };
        fetchParentCats();
    }, []);

    useEffect(() => {
        const fetchBreeds = async () => {
            try {
                const response = await fetch(
                    `${process.env.NEXT_PUBLIC_API_BASE_URL}/breeds`
                );
                if (!response.ok) {
                    throw new Error('Failed to fetch breeds');
                }
                const data: BreedsType[] = await response.json();
                setBreeds(data);
            } catch (error) {
                console.error('猫種一覧の取得に失敗しました', error);
            }
        };
        fetchBreeds();
    }, []);

    useEffect(() => {
        const fetchColors = async () => {
            try {
                const response = await fetch(
                    `${process.env.NEXT_PUBLIC_API_BASE_URL}/colors`
                );
                if (!response.ok) {
                    throw new Error('Failed to fetch colors');
                }
                const data: ColorsType[] = await response.json();
                setColors(data);
            } catch (error) {
                console.error('カラー一覧の取得に失敗しました', error);
            }
        };
        fetchColors();
    }, []);

    const validateForm = () => {
        const newErrors = {
            fatherCatId: fatherCatId === 0,
            motherCatId: motherCatId === 0,
            breedId: breedId === 0,
            colorId: colorId === 0,
            sex: sex === 2,
            birthDate: birthDate === null,
            description: description.trim() === '',
            price: price === 0,
            tranState: !allowedTranStates.includes(tranState),
            imageUrls: imageUrls.length === 0 && uploadedImages.length === 0,
            videoUrls: videoUrls.length === 0 && uploadedVideos.length === 0,
        };
        setErrors(newErrors);
        return !Object.values(newErrors).some((error) => error);
    };

    const handleFormSubmit = (e?: React.FormEvent<HTMLFormElement>) => {
        e?.preventDefault();

        if (!validateForm()) {
            return;
        }

        const formData = new FormData();
        formData.append('kittenId', kittenId.toString());
        formData.append('fatherCatId', fatherCatId.toString());
        formData.append('motherCatId', motherCatId.toString());
        formData.append('breedId', breedId.toString());
        formData.append('colorId', colorId.toString());
        formData.append('sex', sex.toString());
        formData.append(
            'birthDate',
            birthDate ? birthDate.format('YYYY-MM-DD') : ''
        );
        formData.append('description', description);
        formData.append('price', price.toString());
        formData.append('tranState', tranState);

        formData.append('deleteImages', JSON.stringify(deleteImages));
        formData.append('deleteVideos', JSON.stringify(deleteVideos));

        uploadedImages.forEach((file) => {
            console.log(file);
            formData.append('image', file);
        });

        uploadedVideos.forEach((file) => {
            console.log(file);
            formData.append('video', file);
        });

        // コンソールに FormData の中身を表示
        console.log('FormData Entries:');
        for (const [key, value] of formData.entries()) {
            console.log(`${key}:`, value);
        }

        handleUpdateKitten(kittenId, formData);
    };

    const handleImageDeleteClick = (id: number, url: string) => {
        setSelectedImage({ id: id, url: url }); // 選択された画像を保存
        setIsImageModalOpen(true); // モーダルを開く
    };

    const handleCloseImageModal = () => {
        setIsImageModalOpen(false); // モーダルを閉じる
        setSelectedImage(null); // 状態をリセット
    };

    const handleVideoDeleteClick = (id: number, url: string) => {
        setSelectedVideo({ id: id, url: url }); // 選択された画像を保存
        setIsVideoModalOpen(true); // モーダルを開く
    };

    const handleCloseVideoModal = () => {
        setIsVideoModalOpen(false); // モーダルを閉じる
        setSelectedVideo(null); // 状態をリセット
    };

    const handleImageDeleteExecute = () => {
        if (selectedImage) {
            // 削除する対象を deleteImages に追加
            setDeleteImages((prev) => {
                const currentImages = prev || [];
                return [...currentImages, selectedImage];
            });

            // imageUrls 配列から selectedImage.id に該当する要素を取り除く
            setImageUrls((prev) =>
                prev.filter((image) => image.id !== selectedImage.id)
            );
        }

        // モーダルを閉じる
        handleCloseImageModal();
    };

    const handleVideoDeleteExecute = () => {
        if (selectedVideo) {
            // 削除する対象を deleteVideos に追加
            setDeleteVideos((prev) => {
                const currentVideos = prev || [];
                return [...currentVideos, selectedVideo];
            });

            // VideoUrls 配列から selectedVideo.id に該当する要素を取り除く
            setVideoUrls((prev) =>
                prev.filter((video) => video.id !== selectedVideo.id)
            );
        }

        // モーダルを閉じる
        handleCloseVideoModal();
    };

    const handleAddImages = (files: FileList | null) => {
        //現在の写真リストを更新する
        if (files) {
            setUploadedImages((prev) => [...prev, ...Array.from(files)]);
        }
    };

    const handleAddVideos = (files: FileList | null) => {
        //現在の写真リストを更新する
        if (files) {
            setUploadedVideos((prev) => [...prev, ...Array.from(files)]);
        }
    };

    const handleRemoveImage = (index: number) => {
        setUploadedImages((prev) => prev.filter((_, i) => i !== index));
    };

    const handleRemoveVideo = (index: number) => {
        setUploadedVideos((prev) => prev.filter((_, i) => i !== index));
    };

    return (
        <>
            <form onSubmit={handleFormSubmit} className="mx-2">
                <Box sx={{ minWidth: 250, mt: 2 }}>
                    <CustomSelect
                        label="父猫"
                        value={fatherCatId.toString()}
                        options={maleCats.map((cat) => ({
                            value: cat.parentCatId,
                            label: cat.name,
                        }))}
                        onChange={(value) => setFatherCatId(Number(value))}
                        error={errors.fatherCatId}
                        helperText={
                            errors.fatherCatId ? '父猫を選択してください' : ''
                        }
                    />
                </Box>
                <Box sx={{ minWidth: 250, mt: 2 }}>
                    <CustomSelect
                        label="母猫"
                        value={motherCatId.toString()}
                        options={femaleCats.map((cat) => ({
                            value: cat.parentCatId,
                            label: cat.name,
                        }))}
                        onChange={(value) => setMotherCatId(Number(value))}
                        error={errors.motherCatId}
                        helperText={
                            errors.motherCatId ? '母猫を選択してください' : ''
                        }
                    />
                </Box>
                <Box sx={{ minWidth: 250, mt: 2 }}>
                    <CustomSelect
                        label="猫種"
                        value={breedId.toString()}
                        options={breeds.map((breed) => ({
                            value: breed.breedId,
                            label: breed.breedName,
                        }))}
                        onChange={(value) => setBreedId(Number(value))}
                        error={errors.breedId}
                        helperText={
                            errors.breedId ? '猫種を選択してください' : ''
                        }
                    />
                </Box>
                <Box sx={{ minWidth: 250, mt: 2 }}>
                    <CustomSelect
                        label="カラー"
                        value={colorId.toString()}
                        options={colors.map((color) => ({
                            value: color.colorId,
                            label: color.colorName,
                        }))}
                        onChange={(value) => setColorId(Number(value))}
                        error={errors.colorId}
                        helperText={
                            errors.colorId ? '猫色を選択してください' : ''
                        }
                    />
                </Box>
                <Box sx={{ minWidth: 250, mt: 2 }}>
                    <CustomSelect
                        label="性別"
                        value={sex.toString()}
                        options={[
                            { value: 0, label: 'オス' },
                            { value: 1, label: 'メス' },
                        ]}
                        onChange={(value) => setSex(Number(value))}
                        error={errors.sex}
                        helperText={errors.sex ? '性別を選択してください' : ''}
                    />
                </Box>
                <Box sx={{ minWidth: 250, mt: 2 }}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            label="生年月日"
                            value={birthDate}
                            onChange={(newDate) => setBirthDate(newDate)}
                            slotProps={{
                                textField: {
                                    fullWidth: true,
                                    error: errors.birthDate,
                                    helperText: errors.birthDate
                                        ? '生年月日を選択してください'
                                        : '',
                                },
                            }}
                        />
                    </LocalizationProvider>
                </Box>
                <Box sx={{ minWidth: 250, mt: 2 }}>
                    <TextField
                        fullWidth
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        label="説明"
                        variant="outlined"
                        error={errors.description}
                        helperText={
                            errors.description ? '説明を入力してください' : ''
                        }
                    />
                </Box>
                <Box sx={{ minWidth: 250, mt: 2 }}>
                    <TextField
                        fullWidth
                        value={price}
                        onChange={(e) => setPrice(Number(e.target.value))}
                        label="価格"
                        type="number"
                        variant="outlined"
                        error={errors.price}
                        helperText={
                            errors.price ? '価格を入力してください' : ''
                        }
                    />
                </Box>
                <Box sx={{ minWidth: 250, mt: 2 }}>
                    <CustomSelectString
                        label="取引状態"
                        value={tranState || '募集中'}
                        options={[
                            { value: '募集中', label: '募集中' },
                            { value: '商談中', label: '商談中' },
                            { value: '譲渡済', label: '譲渡済' },
                        ]}
                        onChange={(value) => setTranState(value)}
                    />
                </Box>
                {/* 画像一覧表示 */}
                <Box sx={{ minWidth: 250, mt: 2 }}>
                    {imageUrls.length != 0 ? (
                        <div className="flex flex-col gap-4">
                            {imageUrls.map((image, index) => (
                                <div
                                    key={index}
                                    className="relative w-full h-[300px]"
                                    style={{
                                        aspectRatio: '2 / 1', // 2:1 の比率を設定
                                    }}
                                >
                                    <img
                                        src={image.url}
                                        alt={`Kitten Image ${index + 1}`}
                                        className="w-full h-full object-cover rounded-md"
                                    />
                                    <IconButton
                                        color="error"
                                        onClick={() =>
                                            handleImageDeleteClick(
                                                image.id,
                                                image.url
                                            )
                                        }
                                        size="small"
                                        className="absolute top-0 right-0"
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p>更新前の写真はありません。</p>
                    )}
                </Box>

                {/* 動画表示 */}
                <Box sx={{ minWidth: 250, mt: 2 }}>
                    {videoUrls && videoUrls.length !== 0 ? (
                        videoUrls.map((video, index) => (
                            <div key={index} className="relative w-full h-[400px]">
                                <video
                                    src={video.url}
                                    controls
                                    className="w-full h-full object-cover rounded-md"
                                />
                                <IconButton
                                    color="error"
                                    onClick={() =>
                                        handleVideoDeleteClick(
                                            video.id,
                                            video.url
                                        )
                                    }
                                    size="large"
                                    className="absolute top-0 right-0"
                                >
                                    <DeleteIcon />
                                </IconButton>
                            </div>
                        ))
                    ) : (
                        <p>更新前の動画はありません。</p>
                    )}
                </Box>
                <div className="mt-3">
                    <FileUploadButton
                        onChange={(files) => handleAddImages(files)}
                        buttonName="画像をアップロード"
                        multiple
                    />
                    <ul>
                        {uploadedImages.map((file, index) => (
                            <li key={index} className="flex items-center">
                                {file.name}
                                <IconButton
                                    onClick={() => handleRemoveImage(index)}
                                    aria-label="delete"
                                    size="small"
                                >
                                    <CloseIcon />
                                </IconButton>
                            </li>
                        ))}
                    </ul>
                    {errors.imageUrls && (
                        <p className="text-red-500 text-sm ml-3">
                            画像をアップロードしてください。
                        </p>
                    )}
                </div>
                <div className="mt-3">
                    <FileUploadButton
                        onChange={(files) => handleAddVideos(files)}
                        buttonName="動画をアップロード"
                    />
                    <ul>
                        {uploadedVideos.map((file, index) => (
                            <li key={index} className="flex items-center">
                                {file.name}
                                <IconButton
                                    onClick={() => handleRemoveVideo(index)}
                                    aria-label="delete"
                                    size="small"
                                >
                                    <CloseIcon />
                                </IconButton>
                            </li>
                        ))}
                    </ul>
                    {errors.videoUrls && (
                        <p className="text-red-500 text-sm ml-3">
                            動画をアップロードしてください。
                        </p>
                    )}
                </div>
                <Box sx={{ minWidth: 250, mt: 2 }}>
                    <Button
                        fullWidth
                        variant="contained"
                        sx={{
                            height: 50,
                        }}
                        onClick={() => handleFormSubmit()}
                    >
                        子猫を更新
                    </Button>
                </Box>
            </form>
            <Modal isOpen={isImageModalOpen} onClose={handleCloseImageModal}>
                <div className="text-center">
                    <h2 className="text-lg font-bold mb-2">
                        写真を削除しますか？
                    </h2>
                    {selectedImage && (
                        <img
                            src={selectedImage.url}
                            alt="Selected Kitten"
                            className="w-full h-auto mb-4 object-cover rounded-md"
                            style={{ height: 300, minWidth: 250 }}
                        />
                    )}
                </div>
                <Box sx={{ minWidth: 250, mt: 2 }}>
                    <Button
                        fullWidth
                        variant="contained"
                        sx={{
                            height: 50,
                            backgroundColor: 'red', // ボタンの背景色を赤に設定
                            color: 'white', // テキストの色を白に設定
                            '&:hover': {
                                backgroundColor: 'darkred', // ホバー時の背景色を濃い赤に設定
                            },
                        }}
                        onClick={() => handleImageDeleteExecute()}
                    >
                        ゴミ箱に入れる
                    </Button>
                </Box>
            </Modal>
            <Modal isOpen={isVideoModalOpen} onClose={handleCloseVideoModal}>
                <div className="text-center">
                    <h2 className="text-lg font-bold mb-2">
                        動画を削除しますか？
                    </h2>
                    {selectedVideo && (
                        <video
                            src={selectedVideo.url}
                            controls
                            className="w-full h-auto mb-4 object-cover rounded-md"
                            style={{ height: 300, minWidth: 250 }}
                        />
                    )}
                </div>
                <Box sx={{ minWidth: 250, mt: 2 }}>
                    <Button
                        fullWidth
                        variant="contained"
                        sx={{
                            height: 50,
                            backgroundColor: 'red',
                            color: 'white',
                            '&:hover': {
                                backgroundColor: 'darkred',
                            },
                        }}
                        onClick={() => handleVideoDeleteExecute()}
                    >
                        ゴミ箱に入れる
                    </Button>
                </Box>
            </Modal>
        </>
    );
};

export default KittensUpdateForm;
