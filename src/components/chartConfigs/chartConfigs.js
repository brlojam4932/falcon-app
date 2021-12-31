export const historyOptions = {
  // export an object
  lineHeightAnnotation: {
    always: true,
    hoover: false,
    lineWeight: 1.5
  },

  animation: {
    duration: 2000
  },

  maintainAspectRatio: false,
  reponsive: true,
  scales: {
    xAxes: [
      {
        type: "time",
        distribution: "linear"
      }
    ],
  },
 
};
