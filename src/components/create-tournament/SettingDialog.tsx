'use client';

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  Typography,
  Box,
  Divider,
  InputAdornment,
  useTheme,
  Slider,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  Paper,
  alpha,
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import CampaignIcon from '@mui/icons-material/Campaign';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import { useEffect } from 'react';

export interface ISettingValues {
  groupName: string;
  eliminationType: 'single' | 'double';
  fee: number;
}

interface Props {
  open: boolean;
  onClose: () => void;
  onSave: (data: ISettingValues) => void;
  initialData?: ISettingValues;
}

export default function SettingDialog({
  open,
  onClose,
  onSave,
  initialData = {
    groupName: '',
    eliminationType: 'single',
    fee: 0,
  },
}: Props) {
  const theme = useTheme();
  const { control, handleSubmit, reset, watch } = useForm<ISettingValues>({
    defaultValues: initialData,
  });
  const currentEliminationType = watch('eliminationType');
  const currentFee = watch('fee');

  useEffect(() => {
    if (open && initialData) {
      reset(initialData);
    }
  }, [open, initialData, reset]);

  const onSubmit = (data: ISettingValues) => {
    onSave(data);
  };

  const eliminationTypeInfo = {
    single: {
      title: 'Single Elimination',
      description:
        'Format klasik dimana peserta yang kalah langsung tersingkir dari turnamen.',
      advantages: ['Lebih cepat', 'Mudah diorganisir', 'Membutuhkan lebih sedikit pertandingan'],
    },
    double: {
      title: 'Double Elimination',
      description:
        'Peserta harus kalah dua kali sebelum tersingkir dari turnamen.',
      advantages: ['Lebih adil', 'Memberikan kesempatan kedua', 'Lebih banyak pertandingan'],
    },
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
          overflow: 'hidden',
        },
      }}
    >
      <DialogTitle
        sx={{
          bgcolor: theme.palette.primary.main,
          color: 'white',
          pb: 1,
        }}
      >
        <Typography>Setting Pertandingan</Typography>
        <Typography variant="body2" sx={{ opacity: 0.8 }}>
          Atur sistem pertandingan dan grup tournament
        </Typography>
      </DialogTitle>

      <DialogContent dividers>
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: theme.spacing(3),
          }}
        >
          {/* Left column */}
          <Box sx={{ width: { xs: '100%', md: '48%' } }}>
            <Box mb={3}>
              <Controller
                name="groupName"
                control={control}
                rules={{ required: 'Nama grup harus diisi' }}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    label="Nama Group"
                    fullWidth
                    margin="normal"
                    error={!!fieldState.error}
                    helperText={
                      fieldState.error?.message ||
                      'Contoh: Group A, Elite 8, Top 16, dsb'
                    }
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <PeopleAltIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                )}
              />
            </Box>

            <Box mb={3}>
              <Typography variant="subtitle1" gutterBottom fontWeight="500">
                Format Pertandingan
              </Typography>
              <Controller
                name="eliminationType"
                control={control}
                render={({ field }) => (
                  <FormControl component="fieldset">
                    <RadioGroup {...field} row>
                      <Box
                        sx={{
                          display: 'flex',
                          flexDirection: { xs: 'column', md: 'row' },
                          gap: theme.spacing(2),
                        }}
                      >
                        {(['single', 'double'] as const).map((type) => (
                          <Paper
                            key={type}
                            elevation={currentEliminationType === type ? 3 : 1}
                            sx={{
                              p: 2,
                              border: `1px solid ${
                                currentEliminationType === type
                                  ? theme.palette.primary.main
                                  : theme.palette.divider
                              }`,
                              borderRadius: 1,
                              bgcolor:
                                currentEliminationType === type
                                  ? alpha(theme.palette.primary.main, 0.05)
                                  : 'background.paper',
                              flex: 1,
                            }}
                          >
                            <FormControlLabel
                              value={type}
                              control={<Radio />}
                              label={
                                <Typography variant="subtitle2" fontWeight="500">
                                  {eliminationTypeInfo[type].title}
                                </Typography>
                              }
                            />
                            <Typography
                              variant="body2"
                              color="text.secondary"
                              sx={{ mt: 1 }}
                            >
                              {eliminationTypeInfo[type].description}
                            </Typography>
                          </Paper>
                        ))}
                      </Box>
                    </RadioGroup>
                  </FormControl>
                )}
              />
            </Box>
          </Box>

          {/* Right column */}
          <Box sx={{ width: { xs: '100%', md: '48%' } }}>
            <Paper sx={{ p: 3, bgcolor: '#f9f9f9', height: '100%' }}>
              <Typography
                variant="subtitle1"
                gutterBottom
                fontWeight="500"
                sx={{ display: 'flex', alignItems: 'center' }}
              >
                <EmojiEventsIcon sx={{ mr: 1 }} color="primary" />
                Biaya Pendaftaran
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <Controller
                name="fee"
                control={control}
                render={({ field }) => (
                  <>
                    <TextField
                      {...field}
                      label="Biaya Daftar"
                      type="number"
                      fullWidth
                      margin="normal"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">Rp</InputAdornment>
                        ),
                      }}
                    />
                    <Box sx={{ px: 2, mt: 2 }}>
                      <Slider
                        value={field.value}
                        onChange={(_, newVal) => field.onChange(newVal)}
                        step={10000}
                        marks
                        min={0}
                        max={500000}
                        valueLabelDisplay="auto"
                        valueLabelFormat={(v) =>
                          `Rp ${v.toLocaleString('id-ID')}`
                        }
                      />
                    </Box>
                    <Box sx={{ mt: 2 }}>
                      <Typography variant="body2" color="text.secondary">
                        {currentFee === 0 ? (
                          'Gratis untuk semua peserta'
                        ) : (
                          <>
                            Peserta akan membayar biaya pendaftaran sebesar{' '}
                            <b>Rp {currentFee.toLocaleString('id-ID')}</b>
                          </>
                        )}
                      </Typography>
                    </Box>
                  </>
                )}
              />
            </Paper>
          </Box>

          {/* Full width info banner */}
          <Box sx={{ width: '100%' }}>
            <Paper sx={{ p: 3, bgcolor: '#f0f7ff' }}>
              <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                <CampaignIcon color="info" sx={{ mr: 1, mt: 0.5 }} />
                <Box>
                  <Typography variant="subtitle2" fontWeight="500">
                    Informasi Format{' '}
                    {currentEliminationType === 'single'
                      ? 'Single'
                      : 'Double'}{' '}
                    Elimination
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    gutterBottom
                  >
                    {eliminationTypeInfo[currentEliminationType].description}
                  </Typography>
                  <Box component="ul" sx={{ pl: 2, mt: 1, mb: 0 }}>
                    {eliminationTypeInfo[
                      currentEliminationType
                    ].advantages.map((adv, idx) => (
                      <Typography component="li" variant="body2" key={idx}>
                        {adv}
                      </Typography>
                    ))}
                  </Box>
                </Box>
              </Box>
            </Paper>
          </Box>
        </Box>
      </DialogContent>

      <DialogActions sx={{ px: 3, py: 2 }}>
        <Button onClick={onClose} variant="outlined">
          Batal
        </Button>
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
