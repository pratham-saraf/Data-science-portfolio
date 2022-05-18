library(dslabs)
data(murders)

murder_rate <- murders$total / murders$population * 100000

index <- murder_rate <= 0.71

murders$state[index]

sum(index)

west <- murders$region == "West"
safe <- murder_rate <= 1

index <- safe & west
murders$state[index]
