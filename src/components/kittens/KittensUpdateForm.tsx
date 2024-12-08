import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { CustomSelect } from '../ui/Select';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import { Button } from '@mui/material';
import { BreedsType, ColorsType, KittenDetailType, ParentCatsType } from '@/types/getTypes';

interface KittensUpdateFormProps {
    handleUpdateKitten: (kittenId: number, formData: FormData) => void;
    initialData?: KittenDetailType;
}

const KittensUpdateForm: React.FC<KittensUpdateFormProps> = ({ handleUpdateKitten, initialData }) => {
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
    const [maleCats, setMaleCats] = useState<ParentCatsType[]>([]);
    const [femaleCats, setFemaleCats] = useState<ParentCatsType[]>([]);
    const [breeds, setBreeds] = useState<BreedsType[]>([]);
    const [colors, setColors] = useState<ColorsType[]>([]);
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
    });

    useEffect(() => {
        if (initialData) {
            setKittenId(initialData.kittenId || 0);
            setFatherCatId(initialData.fatherCatId || 0);
            setMotherCatId(initialData.motherCatId || 0);
            setBreedId(initialData.breedId || 0);
            setColorId(initialData.breedId || 0);
            setSex(initialData.sex || 0);
            setBirthDate(initialData.birthDate ? dayjs(initialData.birthDate) : null);
            setDescription(initialData.description || '');
            setPrice(initialData.price || 0);
            setTranState(initialData.tranState || '');
        }
    }, [initialData]);

    useEffect(() => {
        const fetchParentCats = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/parent`);
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
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/breeds`);
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
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/colors`);
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
            fatherCatId: fatherCatId === 0,
            motherCatId: motherCatId === 0,
            breedId: breedId === 0,
            colorId: colorId === 0,
            sex: sex === 2,
            birthDate: birthDate === null,
            description: description.trim() === '',
            price: price === 0,
            tranState: tranState.trim() === '',
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
        formData.append('fatherCatId', fatherCatId.toString());
        formData.append('motherCatId', motherCatId.toString());
        formData.append('breedId', breedId.toString());
        formData.append('colorId', colorId.toString());
        formData.append('sex', sex.toString());
        formData.append('birthDate', birthDate ? birthDate.format('YYYY-MM-DD') : '');
        formData.append('description', description);
        formData.append('price', price.toString());
        formData.append('tranState', tranState);

        handleUpdateKitten(kittenId, formData);
    };

    return (
        <form onSubmit={handleFormSubmit} className="mx-4 lg:mx-40">
            <div className="mt-3">
                <CustomSelect
                    label="父猫"
                    value={fatherCatId.toString()}
                    options={maleCats.map((cat) => ({
                        value: cat.parentCatId,
                        label: cat.name,
                    }))}
                    onChange={(value) => setFatherCatId(Number(value))}
                    error={errors.fatherCatId}
                    helperText={errors.fatherCatId ? '父猫を選択してください' : ''}
                />
            </div>
            <div className="mt-3">
                <CustomSelect
                    label="母猫"
                    value={motherCatId.toString()}
                    options={femaleCats.map((cat) => ({
                        value: cat.parentCatId,
                        label: cat.name,
                    }))}
                    onChange={(value) => setMotherCatId(Number(value))}
                    error={errors.motherCatId}
                    helperText={errors.motherCatId ? '母猫を選択してください' : ''}
                />
            </div>
            <div className="mt-3">
                <CustomSelect
                    label="猫種"
                    value={breedId.toString()}
                    options={breeds.map((breed) => ({
                        value: breed.breedId,
                        label: breed.breedName,
                    }))}
                    onChange={(value) => setBreedId(Number(value))}
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
                    onChange={(value) => setColorId(Number(value))}
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
                    onChange={(value) => setSex(Number(value))}
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
                                helperText: errors.birthDate ? '生年月日を選択してください' : '',
                            },
                        }}
                    />
                </LocalizationProvider>
            </div>
            <Box sx={{ minWidth: 120, mt: 2 }}>
                <TextField
                    fullWidth
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    label="説明"
                    variant="outlined"
                    error={errors.description}
                    helperText={errors.description ? '説明を入力してください' : ''}
                />
            </Box>
            <Box sx={{ minWidth: 120, mt: 2 }}>
                <TextField
                    fullWidth
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                    label="価格"
                    type="number"
                    variant="outlined"
                    error={errors.price}
                    helperText={errors.price ? '価格を入力してください' : ''}
                />
            </Box>
            <Box sx={{ minWidth: 120, mt: 2 }}>
                <TextField
                    fullWidth
                    value={tranState}
                    onChange={(e) => setTranState(e.target.value)}
                    label="取引状態"
                    variant="outlined"
                    error={errors.tranState}
                    helperText={errors.tranState ? '取引状態を入力してください' : ''}
                />
            </Box>
            <div className="mt-3">
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
            </div>
        </form>
    );
};

export default KittensUpdateForm;