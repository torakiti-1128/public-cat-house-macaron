import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { ParentCatsType } from '@/types/getTypes';
import { deleteParentCat, fetchParentCats, postParentCat } from '@/api/parentCatsApi';
import { ConfirmDialog, FullScreenDialog } from '../ui/Dialog';
import { Box, CircularProgress, Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ParentCatsAddForm from './ParentCatsAddForm';

interface ParentCatsProps {
    parentCats: ParentCatsType[];
    getParentCats: () => Promise<void>;
}

const ParentCats: React.FC<ParentCatsProps> = ({ parentCats, getParentCats }) => {
    const [alertMessage, setAlertMessage] = useState<string | null>(null);
    const [alertSeverity, setAlertSeverity] = useState<'success' | 'error'>(
        'success'
    );
    const [isAlertOpen, setAlertOpen] = useState(false);
    const [isDialogOpen, setDialogOpen] = useState(false);
    const [isFullScreenOpen, setFullScreenOpen] = useState(false);
    const [selectedCatId, setSelectedCatId] = useState<number | null>(null);
    const [loading, setLoading] = useState(false); // ローディング状態

    const showAlert = (message: string, severity: 'success' | 'error') => {
        setAlertMessage(message);
        setAlertSeverity(severity);
        setAlertOpen(true);
    };

    const handleAlertClose = () => setAlertOpen(false);

    const handleOpenDialog = (id: number) => {
        setSelectedCatId(id);
        setDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setDialogOpen(false);
        setSelectedCatId(null);
    };

    const handleConfirmDelete = async () => {
        if (selectedCatId !== null) {
            try {
              setLoading(true);
                await deleteParentCat(selectedCatId);
                setLoading(false);
                await getParentCats(); 
                showAlert('親猫を削除しました。', 'success');
            } catch (error) {
                console.error('削除エラー:', error);
                showAlert('親猫の削除に失敗しました。', 'error');
            } finally {
                handleCloseDialog();
            }
        }
    };

    const handleAddParentCat = async (formData: FormData) => {
        try {
            setLoading(true);
            await postParentCat(formData);
            setLoading(false);
            setFullScreenOpen(false)
            await getParentCats(); 
            showAlert('親猫を追加しました。', 'success');
        } catch (error) {
            console.error('追加エラー:', error);
            showAlert('親猫の追加に失敗しました。', 'error');
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6 text-">親猫管理サイト</h1>
            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {parentCats.map((cat) => (
                    <Card
                        key={cat.parentCatId}
                        sx={{
                            maxWidth: 345,
                            margin: '0 auto',
                            '@media (max-width: 768px)': {
                                maxWidth: '100%',
                            },
                        }}
                    >
                        <CardMedia
                            component="img"
                            image={
                                cat.imageUrl ||
                                '/static/images/cards/contemplative-reptile.jpg'
                            }
                            alt={cat.name}
                            sx={{
                                width: 400,
                                height: 300,
                                objectFit: 'cover',
                            }}
                        />
                        <CardContent>
                            <Typography
                                gutterBottom
                                variant="h5"
                                component="div"
                            >
                                {cat.name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                性別: {cat.sex === 1 ? 'オス' : 'メス'}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                猫種: {cat.breed}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                年齢: {cat.age}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button
                                size="small"
                            >
                                修正
                            </Button>
                            <Button
                                size="small"
                                color="error"
                                onClick={() =>
                                    handleOpenDialog(cat.parentCatId)
                                }
                            >
                                消去
                            </Button>
                        </CardActions>
                    </Card>
                ))}
            </div>
            <Box sx={{ position: 'fixed', bottom: 16, right: 16 }}>
                <Fab
                    color="primary"
                    aria-label="add"
                    onClick={() => setFullScreenOpen(true)}
                >
                    <AddIcon />
                </Fab>
            </Box>           
            <Box
              sx={{
                display: loading ? 'flex' : 'none', // ローディング中のみ表示
                position: 'fixed', // 固定位置
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'rgba(255, 255, 255, 0.7)', // 背景を薄く白くする
                zIndex: 2000, // 他のコンポーネントより上に表示
              }}
            >
              <CircularProgress />
            </Box>

            <Snackbar
                open={isAlertOpen}
                autoHideDuration={6000}
                onClose={handleAlertClose}
            >
                <Alert severity={alertSeverity} onClose={handleAlertClose}>
                    {alertMessage}
                </Alert>
            </Snackbar>
            <FullScreenDialog
                open={isFullScreenOpen}
                onClose={() => setFullScreenOpen(false)}
                onSave={() => {
                    setFullScreenOpen(false);
                }}
                title="親猫追加"
                buttonName="追加"
            >
                <ParentCatsAddForm handleAddParentCat={handleAddParentCat} />
            </FullScreenDialog>
            <ConfirmDialog
                open={isDialogOpen}
                title="削除確認"
                description="この親猫を削除してもよろしいですか？"
                buttonName="消去"
                onClose={handleCloseDialog}
                onConfirm={handleConfirmDelete}
            />
        </div>
    );
};

export default ParentCats;
