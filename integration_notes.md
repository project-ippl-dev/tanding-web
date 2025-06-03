# Catatan Integration testing

- Catatan integrasi

## Halaman user profile

- Contoh payload :

```json
{
    "name": "dytlan",
    "born_at": "bandung",
    "born_on": "$D1997-01-01T00:07:12.000Z",
    "identity_number": "1111111111111111",
    "phone": "6285161193635",
    "gender": "male",
    "about": "test ayo lagi",
    "photo": ""
}
```

- Masalah :
  - Data tanggal lahir belum dapat update dengan format waktu tersebut, mungkin dari FE perlu merubah format waktu
  - Cara upload file gambar untuk profile ?
  - Dalam user profile dalam source sebelumnya terdapat data properti yang menunjukkan gambar club,

  ```javascript
  <Grid item md={3} xs={12} className={classes.boxClub}>
    {profile.club.map((value) => (
      <div className={classes.containGroup} key={value.id}>
        <Avatar className={classes.imgGroup} src={value.image} />
        <Typography className={classes.textBold}>
          {value.name}
        </Typography>
      </div>
    ))}
  </Grid>
  ```

- Tapi dalam payload Profile atau yang paling mendekati data Auth tapi gak ada payload image

```javascript
//--- Data setelah proses Login (Auth)
"clubs": [
      {
        "id": "41510e3f-f3ed-4b86-811d-74755b794519",
        "name": "Black Jaguar Taekwondo Club"
        // Tidak ada property image ?
      }
]
//...
```

## Halaman Own Detail Tournament

- Masalah :
  - Sama respon dari bracket bisa di cek takut ada typo antara payload dengan properti "seeds" yang ditulis "seed" 
  - buat fungsi Generate Bracket hmm masih dapet error 500 (tp saya pake data mock wkwkkw.. jadi emang salah sy kayaknya)
  - Dari BE ada data properti "random_status" atau "random" untuk data bracket? soalnya dari data mock gak ada tapi diperluin buat proses lock bracket dari FE