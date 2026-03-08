import express from "express";
import { body, validationResult } from "express-validator";
import { sendMail } from "../config/mailConfig.js";

const router = express.Router();

router.post(
  "/mail",
  [
    body("email")
      .notEmpty()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("Invalid email address"),
    body("firstName").notEmpty().withMessage("First name is required"),
    body("message").notEmpty().withMessage("Message is required"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const result = await sendMail(req.body);
      if (result.success) {
        return res
          .status(200)
          .json({ message: "Email sent successfully", data: result.data });
      } else {
        return res
          .status(500)
          .json({ message: "Failed to send email", error: result.error });
      }
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Internal server error", error: error.message });
    }
  },
);

export default router;
