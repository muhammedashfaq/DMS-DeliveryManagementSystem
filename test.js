// function addToArrayForm(num, k) {
//     const result = [];
//     let i = num.length - 1;
//     let carry = k;

//     while (i >= 0 || carry > 0) {
//         if (i >= 0) {
//             carry += num[i];
//         }

//         result.unshift(carry % 10);
//         carry = Math.floor(carry / 10);
//         i--;
//     }

//     return result;
// }


// const num = [1, 3, 2, 1];
// const k = 100;

// const result = addToArrayForm(num, k);
// console.log(result); // Output: [1, 4, 3, 2, 1]


//   let n=2

//   let a = new Array()
//     a[1]=1
//     a[2]=2

//   console.log(a)



//   function climbStairs(n) {
//     if (n <= 2) {
//         return n;
//     }

//     let dp =[]
//     dp[0]=0
//     dp[1] = 1;
//     dp[2] = 2;

    
//     for (let i = 3; i <= n; i++) {
//         dp[i] = dp[i - 1] + dp[i - 2];
//         console.log(dp);
//     }

//     return dp[n];
// }

// const n = 6; 
//  climbStairs(n);

















 function canAliceWin(n) {
    const dp = new Array(n + 1).fill(false); // dp[i] represents whether Alice can win starting from number i

    for (let i = 2; i <= n; i++) {
        for (let x = 1; x < i; x++) {
            if (i % x === 0 && !dp[i - x]) {
                dp[i] = true;
                break;
            }
        }
    }

    return dp[n];
}

const n = 7; // Replace this with the initial number n
const result = canAliceWin(n);
console.log(result); // true if Alice wins, false otherwise


// function lastStoneWeight(stones) {
//     while (stones.length > 1) {
//       stones.sort((a, b) => b - a); // Sort stones in descending order
//       const x = stones.shift(); // Remove the heaviest stone
//       const y = stones.shift(); // Remove the second heaviest stone
  
//       if (x !== y) {
//         const newStone = Math.abs(x - y); // Calculate the new stone's weight
//         stones.push(newStone); // Add the new stone to the array
//       }
//     }
  
//     return stones.length === 0 ? 0 : stones[0];
//   }
  
//   // Example usage:
//   const stones = [2, 7, 4, 1, 8, 1];
//   const result = lastStoneWeight(stones);
//   console.log(result); // Output: 1
  