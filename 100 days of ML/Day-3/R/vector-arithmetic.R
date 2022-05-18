library(dslabs)
data(murders)

murders$state[which.max(murders$population)]

murder_rate <- murders$total / murders$population * 100000

murders$state[order(murder_rate, decreasing=TRUE)]
