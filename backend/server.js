// Define a Schema and Model for Favourites
const favouriteSchema = new mongoose.Schema({
  serverName: String,
  serverAddress: String,
});

const Favourite = mongoose.model('Favourite', favouriteSchema);

// API Endpoints for Favourites
app.get('/api/favourites', async (req, res) => {
  try {
    const favourites = await Favourite.find();
    res.json(favourites);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.post('/api/favourites', async (req, res) => {
  try {
    const newFavourite = new Favourite(req.body);
    await newFavourite.save();
    res.status(201).json(newFavourite);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

app.delete('/api/favourites/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Favourite.findByIdAndDelete(id);
    res.status(204).send();
  } catch (err) {
    res.status(500).send(err.message);
  }
});