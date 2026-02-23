import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { KittenDetailType, KittensType } from '@/types/types';
import { ConfirmDialog, FormDialog, FullScreenDialog } from '../ui/Dialog';
import { Box, CircularProgress, Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import KittensAddForm from '../kittens/KittensAddForm';
import {
    deleteKitten,
    fetchKittenDetail,
    postKitten,
    updateKitten,
} from '@/api/kittensApi';
import KittensUpdateForm from './KittensUpdateForm';

interface KittensProps {
    kittens: KittensType[];
    getKittens: () => Promise<void>;
}

const Kittens: React.FC<KittensProps> = ({ kittens, getKittens }) => {
    const [alertMessage, setAlertMessage] = useState<string | null>(null);
    const [alertSeverity, setAlertSeverity] = useState<'success' | 'error'>(
        'success'
    );
    const [isAlertOpen, setAlertOpen] = useState(false);
    const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [isUpdateDialogOpen, setUpdateDialogOpen] = useState(false);
    const [isFullScreenOpen, setFullScreenOpen] = useState(false);
    const [selectedCatId, setSelectedCatId] = useState<number | null>(null);
    const [loading, setLoading] = useState(false); // ローディング状態
    const [kittenDetail, setKittenDetail] = useState<KittenDetailType>();

    const showAlert = (message: string, severity: 'success' | 'error') => {
        setAlertMessage(message);
        setAlertSeverity(severity);
        setAlertOpen(true);
    };

    const handleAlertClose = () => setAlertOpen(false);

    const handleOpenUpdateDialog = async (id: number) => {
        try {
            const response = await fetchKittenDetail(id);
            setKittenDetail(response);
            setUpdateDialogOpen(true);
        } catch (error) {
            console.error('親猫詳細の取得に失敗しました', error);
            showAlert(
                '親猫詳細の取得に失敗しました。管理者に問い合わせてください。',
                'error'
            );
        }
    };

    const handleCloseUpdateDialog = () => {
        setUpdateDialogOpen(false);
        setSelectedCatId(null);
    };

    const handleOpenDeleteDialog = (id: number) => {
        setSelectedCatId(id);
        setDeleteDialogOpen(true);
    };

    const handleCloseDeleteDialog = async () => {
        setDeleteDialogOpen(false);
        setSelectedCatId(null);
    };

    const handleConfirmDelete = async () => {
        if (selectedCatId !== null) {
            try {
                setLoading(true);
                await deleteKitten(selectedCatId);
                setLoading(false);
                await getKittens();
                showAlert('子猫を削除しました。', 'success');
            } catch (error) {
                console.error('削除エラー:', error);
                showAlert('子猫の削除に失敗しました。', 'error');
            } finally {
                handleCloseDeleteDialog();
            }
        }
    };

    const handleUpdate = async (kittenId: number, formData: FormData) => {
        try {
            setLoading(true);
            await updateKitten(kittenId, formData);
            setLoading(false);
            await getKittens();
            showAlert('子猫を更新しました。', 'success');
        } catch (error) {
            console.error('更新エラー:', error);
            showAlert('子猫の更新に失敗しました。', 'error');
        } finally {
            handleCloseUpdateDialog();
        }
    };

    const handleAddKitten = async (formData: FormData) => {
        try {
            setLoading(true);
            await postKitten(formData);
            setLoading(false);
            setFullScreenOpen(false);
            await getKittens();
            showAlert('子猫を追加しました。', 'success');
        } catch (error) {
            console.error('追加エラー:', error);
            showAlert('子猫の追加に失敗しました。', 'error');
        }
    };

    return (
        <div className="container mx-auto pt-20 p-4">
            <h1 className="text-3xl font-bold mb-6 text-center">
                子猫管理サイト
            </h1>
            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {kittens.map((cat) => (
                    <Card
                        key={cat.kittenId}
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
                            alt={cat.imageUrl}
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
                                お問い合わせ番号：{cat.kittenId}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                猫種: {cat.breed}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                取引状況: {cat.tranState}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                登録日: {cat.createdAt}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button
                                size="small"
                                onClick={() =>
                                    handleOpenUpdateDialog(cat.kittenId)
                                }
                            >
                                更新
                            </Button>
                            <Button
                                size="small"
                                color="error"
                                onClick={() =>
                                    handleOpenDeleteDialog(cat.kittenId)
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
                title="子猫追加"
                buttonName="追加"
            >
                {/* <KittensAddForm handleAddKitten={handleAddKitten} /> */}
                <KittensAddForm handleAddKitten={handleAddKitten} />
            </FullScreenDialog>
            <ConfirmDialog
                open={isDeleteDialogOpen}
                title="削除確認"
                description="この子猫を削除してもよろしいですか？"
                buttonName="消去"
                onClose={handleCloseDeleteDialog}
                onConfirm={handleConfirmDelete}
            />
            <FormDialog
                open={isUpdateDialogOpen}
                title="更新確認"
                buttonName="更新"
                onClose={handleCloseUpdateDialog}
            >
                <KittensUpdateForm
                    handleUpdateKitten={handleUpdate}
                    initialData={kittenDetail}
                />
            </FormDialog>
        </div>
    );
};

export default Kittens;
