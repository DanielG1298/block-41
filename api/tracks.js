import express from "express";
const router = express.Router();
export default router;
import { getTracks, getTrackById } from "#db/queries/tracks";
import { getPlaylistBytrackId } from "#db/queries/playlists";
import requireUser from "#middleware/requireUser";

router.use(requireUser);

router.get("/", async (req, res) => {
  const tracks = await getTracks();
  res.send(tracks);
});

router.get("/:id", async (req, res) => {
  const track = await getTrackById(req.params.id);
  if (!track) return res.status(404).send("Track not found.");

  res.send(track); 
});
router.get("/:id/playlists", async (req,res) =>{
const trackId = req.params.id;
const track = await getTrackById(trackId);
if(!track) return res.status(404).send("track not found");

const playlists = await getPlaylistBytrackId(trackId, req.user.id);
res.send(playlists);
})