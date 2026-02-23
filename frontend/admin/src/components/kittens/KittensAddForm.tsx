import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { CustomSelect, CustomSelectString } from '../ui/Select';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Dayjs } from 'dayjs';
import { Button, IconButton } from '@mui/material';
import { BreedsType, ColorsType, ParentCatsType } from '@/types/types';
import { FileUploadButton } from '../ui/Button';
import CloseIcon from '@mui/icons-material/Close';

interface KittensAddFormProps {
    handleAddKitten: (formData: FormData) => void;
}

const KittensAddForm: React.FC<KittensAddFormProps> = ({ handleAddKitten }) => {
    const [fatherCatId, setFatherCatId] = useState<string>('');
    const [motherCatId, setMotherCatId] = useState<string>('');
    const [breedId, setBreedId] = useState<string>('');
    const [colorId, setColorId] = useState<string>('');
    const [sex, setSex] = useState<string>('');
    const [birthDate, setBirthDate] = useState<Dayjs | null>(null);
    const [description, setDescription] = useState<string>('');
    const [price, setPrice] = useState<number | ''>('');
    const [tranState, setTranState] = useState<string>('');
    const [uploadedImages, setUploadedImages] = useState<File[]>([]);
    const [uploadedVideo, setUploadedVideo] = useState<FileList | null>(null);
    const [breeds, setBreeds] = useState<BreedsType[]>([]);
    const [colors, setColors] = useState<ColorsType[]>([]);
    const [maleCats, setMaleCats] = useState<ParentCatsType[]>([]);
    const [femaleCats, setFemaleCats] = useState<ParentCatsType[]>([]);
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
        images: false,
        video: false,
    });

    useEffect(() => {
        const fetchBreeds = async () => {
            try {
                const response = await fetch(
                    `${process.env.NEXT_PUBLIC_API_BASE_URL}/breeds`
                );
                if (!response.ok) {
                    throw new Error('Failed to fetch breeds');
                }
                const data = await response.json();
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
                const data = await response.json();
                setColors(data);
            } catch (error) {
                console.error('カラー一覧の取得に失敗しました', error);
            }
        };
        fetchColors();
    }, []);

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

    const validateForm = () => {
        const newErrors = {
            fatherCatId: fatherCatId === '',
            motherCatId: motherCatId === '',
            breedId: breedId === '',
            colorId: colorId === '',
            sex: sex === '',
            birthDate: birthDate === null,
            description: description.trim() === '',
            price: price === '' || price <= 0,
            tranState: tranState.trim() === '',
            images: uploadedImages.length === 0,
            video: !uploadedVideo || uploadedVideo.length === 0,
        };
        setErrors(newErrors);
        return !Object.values(newErrors).some((error) => error);
    };

    const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        const formData = new FormData();
        formData.append('fatherCatId', fatherCatId);
        formData.append('motherCatId', motherCatId);
        formData.append('breedId', breedId);
        formData.append('colorId', colorId);
        formData.append('sex', sex);
        formData.append(
            'birthDate',
            birthDate ? birthDate.format('YYYY-MM-DD') : ''
        );
        formData.append('description', description);
        formData.append('price', price.toString());
        formData.append('tranState', tranState);

        uploadedImages.forEach((file) => {
            console.log(file);
            formData.append('image', file);
        });

        if (uploadedVideo) {
            formData.append('video', uploadedVideo[0]);
        }

        handleAddKitten(formData);
    };

    const handleAddImages = (files: FileList | null) => {
        if (files) {
            // null チェックを追加
            setUploadedImages((prev) => [...prev, ...Array.from(files)]);
        }
    };

    const handleRemoveImage = (index: number) => {
        setUploadedImages((prev) => prev.filter((_, i) => i !== index));
    };

    return (
        <form onSubmit={handleFormSubmit}>
            <Box sx={{ minWidth: 120, mt: 2 }}>
                <CustomSelect
                    label="パパ猫"
                    value={fatherCatId}
                    options={maleCats.map((cat) => ({
                        value: cat.parentCatId,
                        label: cat.name,
                    }))}
                    onChange={(value) => setFatherCatId(value.toString())}
                    error={errors.fatherCatId}
                    helperText={
                        errors.fatherCatId ? 'パパ猫を選択してください' : ''
                    }
                />
            </Box>
            <Box sx={{ minWidth: 120, mt: 2 }}>
                <CustomSelect
                    label="ママ猫"
                    value={motherCatId}
                    options={femaleCats.map((cat) => ({
                        value: cat.parentCatId,
                        label: cat.name,
                    }))}
                    onChange={(value) => setMotherCatId(value.toString())}
                    error={errors.motherCatId}
                    helperText={
                        errors.motherCatId ? 'ママ猫を選択してください' : ''
                    }
                />
            </Box>
            <Box sx={{ minWidth: 120, mt: 2 }}>
                <CustomSelect
                    label="猫種"
                    value={breedId}
                    options={breeds.map((breed) => ({
                        value: breed.breedId,
                        label: breed.breedName,
                    }))}
                    onChange={(value) => setBreedId(value.toString())}
                    error={errors.breedId}
                    helperText={errors.breedId ? '猫種を選択してください' : ''}
                />
            </Box>
            <Box sx={{ minWidth: 120, mt: 2 }}>
                <CustomSelect
                    label="カラー"
                    value={colorId}
                    options={colors.map((color) => ({
                        value: color.colorId,
                        label: color.colorName,
                    }))}
                    onChange={(value) => setColorId(value.toString())}
                    error={errors.colorId}
                    helperText={
                        errors.colorId ? 'カラーを選択してください' : ''
                    }
                />
            </Box>
            <Box sx={{ minWidth: 120, mt: 2 }}>
                <CustomSelect
                    label="性別"
                    value={sex}
                    options={[
                        { value: 0, label: 'オス' },
                        { value: 1, label: 'メス' },
                    ]}
                    onChange={(value) => setSex(value.toString())}
                    error={errors.sex}
                    helperText={errors.sex ? '性別を選択してください' : ''}
                />
            </Box>
            <Box sx={{ minWidth: 120, mt: 2 }}>
                <CustomSelectString
                    label="取引状態"
                    value={tranState}
                    options={[
                        { value: '募集中', label: '募集中' },
                        { value: '商談中', label: '商談中' },
                        { value: '譲渡済', label: '譲渡済' },
                    ]}
                    onChange={(value) => setTranState(value)}
                    error={errors.tranState}
                    helperText={
                        errors.tranState ? '取引状態を選択してください' : ''
                    }
                />
            </Box>
            <Box sx={{ minWidth: 120, mt: 2 }}>
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
            <Box sx={{ minWidth: 120, mt: 2 }}>
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
            <Box sx={{ minWidth: 120, mt: 2 }}>
                <TextField
                    fullWidth
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value) || '')}
                    label="価格"
                    variant="outlined"
                    error={errors.price}
                    helperText={errors.price ? '価格を入力してください' : ''}
                />
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
                {errors.images && (
                    <p className="text-red-500 text-sm ml-3">
                        少なくとも1つの画像をアップロードしてください。
                    </p>
                )}
            </div>
            <div className="mt-3">
                <FileUploadButton
                    onChange={(files) => setUploadedVideo(files)}
                    buttonName="動画をアップロード"
                />
                {uploadedVideo && (
                    <ul>
                        {Array.from(uploadedVideo).map((file, index) => (
                            <li key={index}>{file.name}</li>
                        ))}
                    </ul>
                )}
                {errors.video && (
                    <p className="text-red-500 text-sm ml-3">
                        動画をアップロードしてください。
                    </p>
                )}
            </div>
            <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 2, height: 50 }}
            >
                子猫を追加
            </Button>
        </form>
    );
};

export default KittensAddForm;
