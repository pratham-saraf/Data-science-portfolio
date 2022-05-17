codes <- c(380, 124, 818)
country <- c("italy", "canada", "egypt")

codes <- c(italy = 380, canada = 124, egypt = 818)
codes <- c("italy" = 380, "canada" = 124, "egypt" = 818)

codes <- c(380, 124, 818)
country <- c("italy","canada","egypt")
names(codes) <- country

codes[2]
codes[c(1,3)]
codes[1:2]

codes["canada"]
codes[c("egypt","italy")]
