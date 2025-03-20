package com.my.bank.service.impl;

import com.my.bank.dto.AccountDto;
import com.my.bank.entity.Account;
import com.my.bank.mapper.AccountMapper;
import com.my.bank.repository.AccountRepository;
import com.my.bank.service.AccountService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;


@Service
public class AccountServiceImpl implements AccountService {

    private AccountRepository accountRepository;


    public AccountServiceImpl(AccountRepository accountRepository) {
        this.accountRepository = accountRepository;
    }

    @Override
    public AccountDto createAccount(AccountDto accountDto) {
        Account account = AccountMapper.mapToAccount(accountDto);
        Account savedAccount =  accountRepository.save(account);
        return AccountMapper.mapToAccountDto(savedAccount);
    }

    @Override
    public AccountDto getAccountById(Long id) {

        Account account =  accountRepository
                .findById(id)
                .orElseThrow(()->new RuntimeException("Account not found"));
        return AccountMapper.mapToAccountDto(account);
    }

    @Override
    public AccountDto deposit(long id, double amount) {
        Account account =  accountRepository
                .findById(id)
                .orElseThrow(()->new RuntimeException("Account not found"));

        double total = account.getBalance() + amount;
        account.setBalance(total);
        Account savedAccount =  accountRepository.save(account);
        return AccountMapper.mapToAccountDto(savedAccount);
    }

    @Override
    public AccountDto withdraw(Long id, double amount) {

        Account account =  accountRepository
                .findById(id)
                .orElseThrow(()->new RuntimeException("Account not found"));

        if(account.getBalance() < amount){
            throw new RuntimeException("Insufficient balance");
        }

        double total = account.getBalance() - amount;
        account.setBalance(total);
        Account savedAccount =  accountRepository.save(account);
        return AccountMapper.mapToAccountDto(savedAccount);
    }

    @Override
    public List<AccountDto> getAccounts() {
       List<Account> accounts =  accountRepository.findAll();
     return accounts.stream().map(account -> AccountMapper.mapToAccountDto(account))
               .collect(Collectors.toList());

    }

    @Override
    public void deleteAccount(Long id) {

        Account account =  accountRepository
                .findById(id)
                .orElseThrow(()->new RuntimeException("Account not found"));


        accountRepository.deleteById(id);
    }
}
