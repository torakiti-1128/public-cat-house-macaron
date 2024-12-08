import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { AgeSelect, CustomSelect, CustomSelectString } from '../ui/Select';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Dayjs } from 'dayjs';
import { Button } from '@mui/material';
import { BreedsType, ColorsType, ParentCatsType } from '@/types/types';
import { FileUploadButton } from '../ui/Button';

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
    const [uploadedImages, setUploadedImages] = useState<FileList | null>(null);
    const [uploadedVideo, setUploadedVideo] = useState<FileList | null>(null);
    const [breeds, setBreeds] = useState<BreedsType[]>([]);
    const [colors, setColors] = useState<ColorsType[]>([]);
    const [maleCats, setMaleCats] = useState<ParentCatsType[]>([]);
    const [femaleCats, setFemaleCats] = useState<ParentCatsType[]>([]);

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

    const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('fatherCatId', fatherCatId); // 父猫ID
        formData.append('motherCatId', motherCatId); // 母猫ID
        formData.append('breedId', breedId); // 猫種ID
        formData.append('colorId', colorId); // カラーID
        formData.append('sex', sex); // 性別
        formData.append(
            'birthDate',
            birthDate ? birthDate.format('YYYY-MM-DD') : '' // 生年月日
        );
        formData.append('description', description); // 説明
        formData.append('price', price.toString()); // 価格
        formData.append('tranState', tranState); // 取引状態

        // 画像ファイルを追加
        if (uploadedImages) {
            Array.from(uploadedImages).forEach((file) => {
                formData.append('image', file); // キー名を"image"に設定
            });
        }

        // 動画ファイルを追加
        if (uploadedVideo) {
            formData.append('video', uploadedVideo[0]); // キー名を"video"に設定
        }

        // フォームデータを送信
        handleAddKitten(formData);
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
                />
            </Box>
            <Box sx={{ minWidth: 120, mt: 2 }}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                        label="生年月日"
                        value={birthDate}
                        onChange={(newDate) => setBirthDate(newDate)}
                        slotProps={{
                            textField: { fullWidth: true },
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
                />
            </Box>
            <div className="mt-3">
                <FileUploadButton
                    onChange={(files) => setUploadedImages(files)}
                    buttonName="画像をアップロード"
                    multiple
                />
                {uploadedImages && (
                    <ul>
                        {Array.from(uploadedImages).map((file, index) => (
                            <li key={index}>{file.name}</li>
                        ))}
                    </ul>
                )}
            </div>
            <div className="mt-3">
                <FileUploadButton
                    onChange={(files) => setUploadedVideo(files)}
                    buttonName="動画をアップロード"
                    multiple
                />
                {uploadedVideo && (
                    <ul>
                        {Array.from(uploadedVideo).map((file, index) => (
                            <li key={index}>{file.name}</li>
                        ))}
                    </ul>
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
