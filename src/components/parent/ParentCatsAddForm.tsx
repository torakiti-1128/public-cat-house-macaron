import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { AgeSelect, CustomSelect } from '../ui/Select';
import { FileUploadButton } from '../ui/Button';
import { BreedsType, ColorsType } from '@/types/getTypes';
import { PostParentCatType } from '@/types/postType';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Dayjs } from 'dayjs';
import { Button } from '@mui/material';

interface ParentCatsAddFormProps {
    handleAddParentCat: (formData: FormData) => void;
}

const ParentCatsAddForm: React.FC<ParentCatsAddFormProps> = ({ handleAddParentCat }) => {
    const [name, setName] = useState('');
    const [breedId, setBreedId] = useState<number>(0);
    const [colorId, setColorId] = useState<number>(0);
    const [age, setAge] = useState<number>(0);
    const [sex, setSex] = useState<number>(0);
    const [birthDate, setBirthDate] = useState<Dayjs | null>(null);
    const [uploadedFiles, setUploadedFiles] = useState<FileList | null>(null);
    const [description, setDescription] = useState('');
    const [breeds, setBreeds] = useState<BreedsType[]>([]);
    const [colors, setColors] = useState<ColorsType[]>([]);

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

    const handleFormSubmit = (e?: React.FormEvent<HTMLFormElement>) => {
        e?.preventDefault();

        const postParentCatData: PostParentCatType = {
            name,
            sex: Number(sex),
            breedId: Number(breedId),
            colorId: Number(colorId),
            age: Number(age),
            birthDate: birthDate ? birthDate.format('YYYY-MM-DD') : '',
            description,
            imageUrl: '',
        };

        const formData = new FormData();
        formData.append('name', postParentCatData.name);
        formData.append('sex', postParentCatData.sex.toString());
        formData.append('breedId', postParentCatData.breedId.toString());
        formData.append('colorId', postParentCatData.colorId.toString());
        formData.append('age', postParentCatData.age.toString());
        formData.append('birthDate', postParentCatData.birthDate);
        formData.append('description', postParentCatData.description);

        if (uploadedFiles) {
            formData.append('image', uploadedFiles[0]);
        }

        handleAddParentCat(formData);
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
                    onChange={(value) => {
                        setSex(value);
                    }}
                />
            </div>
            <div className="mt-3">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                        label="生年月日"
                        value={birthDate}
                        onChange={(newDate) => setBirthDate(newDate)}
                        slotProps={{
                            textField: { fullWidth: true }, // fullWidth を指定
                        }}
                    />
                </LocalizationProvider>
            </div>
            <div className="mt-3">
                <AgeSelect
                    value={age.toString()}
                    onChange={(age) => setAge(age)}
                />
            </div>
            <Box sx={{ minWidth: 120, mt: 2 }}>
                <TextField
                    fullWidth
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    label="説明"
                    variant="outlined"
                />
            </Box>
            <div className="mt-3">
                <FileUploadButton
                    onChange={(files) => setUploadedFiles(files)}
                    buttonName="画像をアップロード"
                    multiple
                />
                {uploadedFiles && (
                    <ul>
                        {Array.from(uploadedFiles).map((file, index) => (
                            <li key={index}>{file.name}</li>
                        ))}
                    </ul>
                )}
            </div>
            <div className="mt-3">
                <Button
                    fullWidth
                    variant="contained"
                    sx={{
                        height: 50,
                    }}
                    onClick={() => handleFormSubmit()} // ボタンでフォーム送信をトリガー
                >
                    親猫を追加
                </Button>
            </div>
        </form>
    );
};

export default ParentCatsAddForm;
