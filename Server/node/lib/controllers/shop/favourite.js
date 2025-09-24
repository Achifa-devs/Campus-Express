import { getFavourite, getFavourites, postDeleteFavourite, postFavourite } from "../../services/shop/favourite.js";
export async function GET_FAVOURITE(req, res) {
  try {
    const favourite = await getFavourite(req.query);
    res.status(201).json({
      success: true,
      data: favourite
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
}
export async function GET_FAVOURITES(req, res) {
  try {
    const favourites = await getFavourites(req.query);
    res.status(201).json({
      success: true,
      data: favourites
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
}
export async function POST_FAVOURITE(req, res) {
  try {
    const post_favourite = await postFavourite(req.body);
    res.status(201).json({
      success: true,
      data: post_favourite
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
}
export async function DELETE_FAVOURITE(req, res) {
  try {
    const delete_favourite = await postDeleteFavourite(req.query);
    res.status(201).json({
      success: true,
      data: delete_favourite
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
}