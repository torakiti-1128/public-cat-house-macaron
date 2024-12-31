import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { AgeSelect, CustomSelect } from '../ui/Select';
import { FileUploadButton } from '../ui/Button';
import { BreedsType, ColorsType, ParentCatDetailType } from '@/types/types';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import { Button, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

interface ParentCatsUpdateFormProps {
    handleUpdateParentCat: (parentCatId: number, formData: FormData) => void; // 更新用関数
    initialData?: ParentCatDetailType; // 初期データ
}

const ParentCatsUpdateForm: React.FC<ParentCatsUpdateFormProps> = ({
    handleUpdateParentCat,
    initialData,
}) => {
    const [parentCatId, setParentCatId] = useState<number>(0);
    const [name, setName] = useState<string>('');
    const [breedId, setBreedId] = useState<number>(0);
    const [colorId, setColorId] = useState<number>(0);
    const [age, setAge] = useState<number>(0);
    const [sex, setSex] = useState<number>(0);
    const [birthDate, setBirthDate] = useState<Dayjs | null>(null);
    const [description, setDescription] = useState<string>('');
    const [uploadedImages, setUploadedImages] = useState<FileList | null>(null);
    const [breeds, setBreeds] = useState<BreedsType[]>([]);
    const [colors, setColors] = useState<ColorsType[]>([]);
    const [errors, setErrors] = useState({
        name: false,
        breedId: false,
        colorId: false,
        sex: false,
        birthDate: false,
        age: false,
        description: false,
    });

    useEffect(() => {
        if (initialData) {
            setParentCatId(initialData.parentCatId || 0);
            setName(initialData.name || '');
            setBreedId(initialData.breedId || 0);
            setColorId(initialData.colorId || 0);
            setAge(initialData.age || 0);
            setSex(initialData.sex || 0);
            setBirthDate(
                initialData.birthDate ? dayjs(initialData.birthDate) : null
            );
            setDescription(initialData.description || '');
        }
    }, [initialData]);

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

    const validateForm = () => {
        const newErrors = {
            name: name.trim() === '',
            breedId: breedId === 0,
            colorId: colorId === 0,
            sex: sex === 2,
            birthDate: birthDate === null,
            age: age === 0,
            description: description.trim() === '',
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
        formData.append('parentCatId', parentCatId.toString());
        formData.append('breedId', breedId.toString());
        formData.append('colorId', colorId.toString());
        formData.append('name', name);
        formData.append('sex', sex.toString());
        formData.append('age', age.toString());
        formData.append(
            'birthDate',
            birthDate ? birthDate.format('YYYY-MM-DD') : ''
        );
        formData.append('description', description);

        // 画像の追加
        if (uploadedImages) {
            Array.from(uploadedImages).forEach((file, index) => {
                formData.append(`image_${index}`, file);
            });
        }

        handleUpdateParentCat(parentCatId, formData);
    };

    const handleRemoveImage = (index: number) => {
        if (!uploadedImages) return;

        const newFileList = Array.from(uploadedImages).filter(
            (_, i) => i !== index
        );

        // 新しい FileList を作成するには DataTransfer を使用
        const dataTransfer = new DataTransfer();
        newFileList.forEach((file) => dataTransfer.items.add(file));
        setUploadedImages(dataTransfer.files);
    };

    return (
        <form onSubmit={handleFormSubmit} className="mx-4 lg:mx-40">
            <Box sx={{ minWidth: 120, mt: 2 }}>
                <TextField
                    fullWidth
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    label="名前"
                    variant="outlined"
                    error={errors.name}
                    helperText={errors.name ? '名前を入力してください' : ''}
                />
            </Box>
            <div className="mt-3">
                <CustomSelect
                    label="猫種"
                    value={breedId.toString()}
                    options={breeds.map((breed) => ({
                        value: breed.breedId,
                        label: breed.breedName,
                    }))}
                    onChange={(value) => setBreedId(value)}
                    error={errors.breedId}
                    helperText={errors.breedId ? '猫種を選択してください' : ''}
                />
            </div>
            <div className="mt-3">
                <CustomSelect
                    label="カラー"
                    value={colorId.toString()}
                    options={colors.map((color) => ({
                        value: color.colorId,
                        label: color.colorName,
                    }))}
                    onChange={(value) => setColorId(value)}
                    error={errors.colorId}
                    helperText={errors.colorId ? '猫色を選択してください' : ''}
                />
            </div>
            <div className="mt-3">
                <CustomSelect
                    label="性別"
                    value={sex.toString()}
                    options={[
                        { value: 0, label: 'オス' },
                        { value: 1, label: 'メス' },
                    ]}
                    onChange={(value) => setSex(value)}
                    error={errors.sex}
                    helperText={errors.sex ? '性別を選択してください' : ''}
                />
            </div>
            <div className="mt-3">
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
            </div>
            <div className="mt-3">
                <AgeSelect
                    value={age.toString()}
                    onChange={(age) => setAge(age)}
                    error={errors.age}
                    helperText={errors.age ? '年齢を選択してください' : ''}
                />
            </div>
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
            <div className="mt-3">
                <FileUploadButton
                    onChange={(files) => setUploadedImages(files)}
                    buttonName="画像をアップロード"
                    multiple
                />
                <ul>
                    {uploadedImages &&
                        Array.from(uploadedImages).map((file, index) => (
                            <li key={index} className="flex items-center mt-2">
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
                {uploadedImages && uploadedImages.length > 1 && (
                    <p className="text-red-500 text-sm mt-2">
                        写真は一枚だけ反映されます
                    </p>
                )}
            </div>
            <div className="mt-3">
                <Button
                    fullWidth
                    variant="contained"
                    sx={{
                        height: 50,
                    }}
                    onClick={() => handleFormSubmit()}
                >
                    親猫を更新
                </Button>
            </div>
        </form>
    );
};

export default ParentCatsUpdateForm;
