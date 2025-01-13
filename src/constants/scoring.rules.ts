export const scoringRules = {
  // Passing stats
  passingYards: 0.04, // 1 point per 25 passing yards
  passingTDs: 4, // 4 points per passing touchdown
  interceptionsThrown: -2, // -2 points per interception thrown
  twoPtPassingConversions: 2, // 2 points per 2-point conversion
  threeHundredYardPassingGame: 2, // 2 bonus points for 300+ yard passing games
  fourHundredYardPassingGame: 3, // 3 bonus points for 400+ yard passing games
  // Rushing stats
  rushingYards: 0.1, // 1 point per 10 rushing yards
  rushingTDs: 6, // 6 points per rushing touchdown
  twoPtRushingConversions: 2, // 2 points per 2-point conversion
  oneHundredYardRushingGame: 2, // 2 bonus points for 100+ rushing yards
  twoHundredYardRushingGame: 3, // 3 bonus points for 200+ rushing yards
  // Receiving stats
  receivingYards: 0.1, // 1 point per 10 receiving yards
  receptions: 1, // 1 point per reception (PPR)
  receivingTDs: 6, // 6 points per receiving touchdown
  twoPtReceivingConversions: 2, // 2 points per 2-point conversion
  oneHundredYardReceivingGame: 2, // 2 bonus points for 100+ receiving yards
  twoHundredYardReceivingGame: 3, // 3 bonus points for 200+ receiving yards

  // Kicking stats
  PATsMade: 1, // 1 point per PAT made // xpMade (K)
  PATsMissed: -1, // -1 point per PAT missed // xpMissed (K)

  /* Remove this from projections  
    Keep in Fant points scoring.

    fgMade X 3
    xpMade X 1
  */

  // Pul from live source and computer accordingly

  // 1 for 37 yards
  fieldGoalsMade0to19: 0,
  fieldGoalsMade20to29: 0,
  fieldGoalsMade30to39: 0, // => 37 yards = count as 1 x (3) = 3
  fieldGoalsMade40to49: 0,
  fieldGoalsMade50Plus: 0,

  // Defensive stats (Team)
  kickoffReturnTDs: 6, // returnTD
  puntReturnTDs: 6, // returnTD
  interceptionReturnTDs: 6, // defTD
  fumbleReturnTDs: 6, // defTD
  blockedKickReturnTDs: 6, // defTD
  sacks: 1, // sacks
  blockedKicks: 2, // blockKick
  interceptions: 2, // interceptions
  fumblesRecovered: 2, // fumbleRecoveries
  safeties: 2, // safeties
  pointsAllowed: 0, // ptsAgainst
  totalYardsAllowed: 0, // For projection: use 250 flat and for live data (get live)
};
