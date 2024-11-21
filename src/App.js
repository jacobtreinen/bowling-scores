import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Grid,
  Paper,
  Button,
} from "@mui/material";

const BowlingScores = () => {
  const [scores, setScores] = useState({
    team1: [
      Array(10).fill(""), // Player 1 scores
      Array(10).fill(""), // Player 2 scores
    ],
    team2: [
      Array(10).fill(""), // Player 1 scores
      Array(10).fill(""), // Player 2 scores
    ],
  });

  const calculatePlayerTotal = (playerScores) => {
    let total = 0;
    for (const frame of playerScores) {
      if (frame === "X") total += 10; // Strike
      else if (frame === "/") total += 10; // Spare (logic assumes valid input)
      else total += parseInt(frame) || 0; // Regular score or empty
    }
    return total;
  };

  const calculateTeamTotal = (team) => {
    return team.reduce((sum, playerScores) => sum + calculatePlayerTotal(playerScores), 0);
  };

  const getWinnerAndDifference = () => {
    const team1Total = calculateTeamTotal(scores.team1);
    const team2Total = calculateTeamTotal(scores.team2);
    if (team1Total > team2Total) {
      return { winner: "Team 1", difference: team1Total - team2Total };
    } else if (team2Total > team1Total) {
      return { winner: "Team 2", difference: team2Total - team1Total };
    } else {
      return { winner: "Tie", difference: 0 };
    }
  };

  const handleScoreChange = (team, player, frame, value) => {
    setScores((prevScores) => {
      const updatedScores = { ...prevScores };
      updatedScores[team][player][frame] = value;
      return updatedScores;
    });
  };

  const { winner, difference } = getWinnerAndDifference();

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" textAlign="center" gutterBottom>
        Bowling Score Tracker
      </Typography>
      <Grid container spacing={4}>
        {["team1", "team2"].map((team, teamIndex) => (
          <Grid item xs={12} md={6} key={team}>
            <Paper elevation={3} sx={{ p: 2 }}>
              <Typography variant="h5" gutterBottom>
                {teamIndex === 0 ? "Team 1" : "Team 2"}
              </Typography>
              {scores[team].map((playerScores, playerIndex) => (
                <Box key={playerIndex} sx={{ mb: 3 }}>
                  <Typography variant="h6" gutterBottom>
                    Player {playerIndex + 1}
                  </Typography>
                  <Grid container spacing={1} alignItems="center">
                    {playerScores.map((score, frameIndex) => (
                      <Grid item xs={1} key={frameIndex}>
                        <TextField
                          variant="outlined"
                          size="small"
                          placeholder={`${frameIndex + 1}`}
                          value={score}
                          onChange={(e) =>
                            handleScoreChange(
                              team,
                              playerIndex,
                              frameIndex,
                              e.target.value
                            )
                          }
                          inputProps={{
                            maxLength: 1,
                          }}
                          sx={{
                            backgroundColor:
                              score === "X"
                                ? "green"
                                : score === "/"
                                ? "yellow"
                                : "white",
                          }}
                        />
                      </Grid>
                    ))}
                    <Grid item xs={2}>
                      <Typography variant="subtitle1">
                        Total: {calculatePlayerTotal(playerScores)}
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>
              ))}
              <Typography variant="h6" gutterBottom>
                Team Total: {calculateTeamTotal(scores[team])}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
      <Box sx={{ textAlign: "center", mt: 4 }}>
        <Typography variant="h5" gutterBottom>
          {winner === "Tie"
            ? "The match is a tie!"
            : `${winner} is winning by ${difference} points!`}
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => console.log("Final Scores:", scores)}
        >
          Submit Scores
        </Button>
      </Box>
    </Box>
  );
};

export default BowlingScores;
