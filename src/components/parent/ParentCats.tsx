import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@/components/ui/Modal";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { ParentCatsType } from "@/types/types";
import { deleteParentCat, postParentCat } from "@/api/parentCatsApi";
import { ConfirmDialog } from "../ui/Dialog";

interface ParentCatsProps {
  parentCats: ParentCatsType[];
}

const ParentCats: React.FC<ParentCatsProps> = ({ parentCats }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState<React.ReactNode | null>(null);

  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [alertSeverity, setAlertSeverity] = useState<"success" | "error">("success");
  const [isAlertOpen, setAlertOpen] = useState(false);

  const [isDialogOpen, setDialogOpen] = useState(false);
  const [selectedCatId, setSelectedCatId] = useState<number | null>(null);

  const showAlert = (message: string, severity: "success" | "error") => {
    setAlertMessage(message);
    setAlertSeverity(severity);
    setAlertOpen(true);
  };

  const handleAlertClose = () => setAlertOpen(false);

  const openModal = (content: React.ReactNode) => {
    setModalContent(content);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setModalContent(null);
  };

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
        await deleteParentCat(selectedCatId);
        showAlert("親猫を削除しました。", "success");
      } catch (error) {
        console.error("削除エラー:", error);
        showAlert("親猫の削除に失敗しました。", "error");
      } finally {
        handleCloseDialog();
      }
    }
  };

  const handleAddParentCat = async (formData: FormData) => {
    try {
      await postParentCat(formData);
      showAlert("親猫を追加しました。", "success");
    } catch (error) {
      console.error("追加エラー:", error);
      showAlert("親猫の追加に失敗しました。", "error");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-">親猫管理サイト</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {parentCats.map((cat) => (
          <Card
            key={cat.parentCatId}
            sx={{
              maxWidth: 345,
              margin: "0 auto",
              "@media (max-width: 768px)": {
                maxWidth: "100%",
              },
            }}
          >
            <CardMedia
              component="img"
              image={cat.imageUrl || "/static/images/cards/contemplative-reptile.jpg"}
              alt={cat.name}
              sx={{
                width: 300,
                height: 200,
                objectFit: "cover",
              }}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {cat.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                性別: {cat.sex === 1 ? "オス" : "メス"}
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
                onClick={() =>
                  openModal(<div>親猫情報編集</div>)
                }
              >
                修正
              </Button>
              <Button
                size="small"
                color="error"
                onClick={() => handleOpenDialog(cat.parentCatId)}
              >
                消去
              </Button>
            </CardActions>
          </Card>
        ))}
      </div>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        {modalContent}
      </Modal>
      <Snackbar open={isAlertOpen} autoHideDuration={6000} onClose={handleAlertClose}>
        <Alert severity={alertSeverity} onClose={handleAlertClose}>
          {alertMessage}
        </Alert>
      </Snackbar>
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