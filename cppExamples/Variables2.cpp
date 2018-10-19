#include <iostream>

int myNum;

int main()
{
    myNum = 10;
    
    std::cout << "JBs Number: " << myNum << std::endl;
    
    myNum = 5;
    
    std::cout << "JBs Number: " << myNum << std::endl;
    
    myNum = myNum + 10;
    
    std::cout << "JBs Number: " << myNum << std::endl;

	return 0;
}
