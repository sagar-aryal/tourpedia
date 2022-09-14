import TourModel from "../models/tour.js";

export const createTour = async (req, res) => {
  const {
    title,
    description,
    name,
    tags,
    image,
    likeCount,
    creator,
    createAt,
  } = req.body;

  const newTour = new TourModel(req.body);
  try {
    await newTour.save();
    res.status(201).json(newTour);
  } catch (error) {
    res.status(404).json({ message: "Something wroung with creating tour" });
  }
};

export const getTours = async (req, res) => {
  try {
    const tours = await TourModel.find();
    res.status(200).json(tours);
  } catch (error) {
    res
      .status(404)
      .json({ message: "Something wroung with getting all tour lists" });
  }
};
