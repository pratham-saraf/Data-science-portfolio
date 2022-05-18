library(data.table)

library(tidyverse)
library(dplyr)
library(dslabs)
data(murders)

# convert the data frame into a data.table object
murders <- setDT(murders)

select(murders, state, region)

murders[, c("state", "region")] |> head()
murders[, .(state, region)] |> head()

murders <- mutate(murders, rate = total / population * 10^5)

murders[, rate := total / population * 100000]
head(murders)
murders[, ":="(rate = total / population * 100000, rank = rank(population))]


#refencing in R
x <- data.table(a = 1)
y <- x

x[,a := 2]
y

y[,a := 1]
x

#using copy to avoid reference

x <- data.table(a = 1)
y <- copy(x)
x[,a := 2]
y
