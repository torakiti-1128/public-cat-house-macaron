import React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { FormHelperText } from '@mui/material';

interface AgeSelectProps {
    value: string;
    onChange: (age: number) => void;
    error?: boolean; // 追加
    helperText?: string; // 追加
}

interface CustomSelectProps {
    label: string; // セレクトボックスのラベル
    value: string; // 現在の選択値
    options: { value: number; label: string }[]; // 選択肢のリスト
    onChange: (value: number) => void; // 値変更時のコールバック
    error?: boolean; // 追加
    helperText?: string; // 追加
}

interface CustomSelectStringProps {
    label: string; // セレクトボックスのラベル
    value: string; // 現在の選択値
    options: { value: string; label: string }[]; // 選択肢のリスト
    onChange: (value: string) => void; // 値変更時のコールバック
    error?: boolean; // 追加
    helperText?: string; // 追加
}

export const AgeSelect: React.FC<AgeSelectProps> = ({
    value,
    onChange,
    error,
    helperText,
}) => {
    const handleChange = (event: SelectChangeEvent) => {
        onChange(Number(event.target.value)); // number に変換して親に渡す
    };

    return (
        <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth error={error}>
                <InputLabel id="age-select-label">年齢</InputLabel>
                <Select
                    labelId="age-select-label"
                    id="age-select"
                    value={value}
                    label="年齢"
                    onChange={handleChange}
                    error={error} // エラーを適用
                >
                    {Array.from({ length: 10 }, (_, i) => (
                        <MenuItem key={i + 1} value={(i + 1).toString()}>
                            {' '}
                            {/* string 型 */}
                            {i + 1}
                        </MenuItem>
                    ))}
                </Select>
                {helperText && <FormHelperText>{helperText}</FormHelperText>}
            </FormControl>
        </Box>
    );
};

export const CustomSelect: React.FC<CustomSelectProps> = ({
    label,
    value,
    options,
    onChange,
    error,
    helperText,
}) => {
    const handleChange = (event: SelectChangeEvent) => {
        onChange(Number(event.target.value));
    };

    return (
        <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth error={error}>
                <InputLabel id={`${label}-select-label`}>{label}</InputLabel>
                <Select
                    labelId={`${label}-select-label`}
                    value={value}
                    label={label}
                    onChange={handleChange}
                    error={error}
                >
                    {options.map((option, index) => (
                        <MenuItem key={index} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </Select>
                {helperText && <FormHelperText>{helperText}</FormHelperText>}
            </FormControl>
        </Box>
    );
};

export const CustomSelectString: React.FC<CustomSelectStringProps> = ({
    label,
    value,
    options,
    onChange,
    error,
    helperText,
}) => {
    const handleChange = (event: SelectChangeEvent) => {
        onChange(event.target.value);
    };

    return (
        <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth error={error}>
                <InputLabel id={`${label}-select-label`}>{label}</InputLabel>
                <Select
                    labelId={`${label}-select-label`}
                    value={value}
                    label={label}
                    onChange={handleChange}
                    error={error}
                >
                    {options.map((option, index) => (
                        <MenuItem key={index} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </Select>
                {helperText && <FormHelperText>{helperText}</FormHelperText>}
            </FormControl>
        </Box>
    );
};
