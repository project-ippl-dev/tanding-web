'use client';

import { 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  Button, 
  TextField, 
  Box, 
  IconButton,
  Typography,
  Divider,
  Paper,
  Avatar,
  Tooltip,
  useTheme
} from '@mui/material';
import { useForm, Controller, useFieldArray } from 'react-hook-form';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import PersonIcon from '@mui/icons-material/Person';
import { useState, useEffect } from 'react';

export interface IPanitia {
  name: string;
  role: string;
}

interface Props {
  open: boolean;
  onClose: () => void;
  onSave: (data: { panitia: IPanitia[] }) => void;
  initialData?: IPanitia[];
}

export default function PanitiaDialog({ open, onClose, onSave, initialData = [{ name: '', role: '' }] }: Props) {
  const theme = useTheme();
  
  const { control, handleSubmit, reset } = useForm<{ panitia: IPanitia[] }>({
    defaultValues: { panitia: initialData },
  });
  
  const { fields, append, remove } = useFieldArray({ name: 'panitia', control });

  // Reset form when dialog opens with initialData
  useEffect(() => {
    if (open && initialData) {
      reset({ panitia: initialData.length > 0 ? initialData : [{ name: '', role: '' }] });
    }
  }, [open, initialData, reset]);

  const onSubmit = (data: { panitia: IPanitia[] }) => {
    onSave(data);
  };

  const getAvatarColor = (index: number): string => {
    const colors: string[] = [
      theme.palette.primary.main,
      theme.palette.secondary.main,
      theme.palette.error.main,
      theme.palette.warning.main,
      theme.palette.info.main,
      theme.palette.success.main,
    ];
    return colors[index % colors.length];
  };

  return (
    <Dialog 
      open={open} 
      onClose={onClose} 
      fullWidth 
      maxWidth="md"
      PaperProps={{
        sx: {
          borderRadius: 2,
          overflow: 'hidden'
        }
      }}
    >
      <DialogTitle sx={{ 
        bgcolor: theme.palette.primary.main, 
        color: 'white',
        pb: 1
      }}>
        <Typography variant="h6">Panitia Pertandingan</Typography>
        <Typography variant="body2" sx={{ opacity: 0.8 }}>
          Tambahkan panitia yang akan membantu mengorganisir pertandingan
        </Typography>
      </DialogTitle>
      
      <DialogContent dividers>
        <Box sx={{ mb: 2, p: 2, bgcolor: 'background.paper' }}>
          <Typography variant="body1" gutterBottom>
            Panitia yang ditambahkan akan memiliki akses untuk:
          </Typography>
          <Typography variant="body2" component="ul" sx={{ pl: 2 }}>
            <li>Mengupdate hasil pertandingan</li>
            <li>Mengelola jadwal pertandingan</li>
            <li>Berkomunikasi dengan peserta</li>
          </Typography>
        </Box>

        {fields.map((field, idx) => (
          <Paper 
            key={field.id} 
            elevation={0} 
            sx={{ 
              p: 2, 
              mb: 2, 
              border: '1px solid',
              borderColor: 'divider',
              borderRadius: 1,
              position: 'relative'
            }}
          >
            <Box display="flex" alignItems="center" gap={2}>
              <Avatar sx={{ bgcolor: getAvatarColor(idx) }}>
                <PersonIcon />
              </Avatar>
              
              <Box flexGrow={1} display="flex" gap={2}>
                <Controller
                  name={`panitia.${idx}.name`}
                  control={control}
                  rules={{ required: "Nama harus diisi" }}
                  render={({ field, fieldState }) => (
                    <TextField 
                      {...field} 
                      label="Nama" 
                      fullWidth 
                      error={!!fieldState.error}
                      helperText={fieldState.error?.message}
                      placeholder="Nama panitia"
                    />
                  )}
                />
                
                <Controller
                  name={`panitia.${idx}.role`}
                  control={control}
                  rules={{ required: "Peran harus diisi" }}
                  render={({ field, fieldState }) => (
                    <TextField 
                      {...field} 
                      label="Peran" 
                      fullWidth 
                      error={!!fieldState.error}
                      helperText={fieldState.error?.message}
                      placeholder="Contoh: Admin, Wasit, Komentator"
                    />
                  )}
                />
              </Box>
              
              <Tooltip title="Hapus panitia">
                <IconButton 
                  onClick={() => remove(idx)}
                  color="error"
                  sx={{ 
                    bgcolor: fields.length > 1 ? 'error.50' : 'transparent',
                    '&:hover': {
                      bgcolor: fields.length > 1 ? 'error.100' : 'transparent',
                    },
                    visibility: fields.length > 1 ? 'visible' : 'hidden'
                  }}
                >
                  <RemoveIcon />
                </IconButton>
              </Tooltip>
            </Box>
          </Paper>
        ))}

        <Box textAlign="center" mt={3}>
          <Button
            variant="outlined"
            startIcon={<AddIcon />}
            onClick={() => append({ name: '', role: '' })}
            sx={{ px: 3 }}
          >
            Tambah Panitia
          </Button>
        </Box>
      </DialogContent>

      <DialogActions sx={{ px: 3, py: 2 }}>
        <Button onClick={onClose} variant="outlined">Batal</Button>
        <Button 
          onClick={handleSubmit(onSubmit)} 
          variant="contained"
          sx={{ minWidth: 100 }}
        >
          Simpan
        </Button>
      </DialogActions>
    </Dialog>
  );
}