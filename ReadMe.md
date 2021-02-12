# Risk
## WireFrame
![Risk](Risk Wire Frame.png)

## User Story
1. Each user starts with xx units and will alternate turns placing units on game board until all units are gone.   
2. Once initial board placements are made, a randomly chosen player will go first with the options to:
    -attack neighboring states
        attack success is random with weighting for number of troops
    -retreat from attacking 
    -invade successfully attacked states 
    -end turn
3. Players who successfully attack a neighboring state will be awarded 1 unit per state.
4. Players will be given a random number of units between 1-3 after their respective turns 
5. A player wins when they have successfully taken over all of the states. 

## Resources
Will use jquery.vmap as map library





