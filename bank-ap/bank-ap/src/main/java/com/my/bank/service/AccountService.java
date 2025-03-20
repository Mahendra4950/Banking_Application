package com.my.bank.service;

import com.my.bank.dto.AccountDto;

import java.util.List;

public interface AccountService {

    AccountDto createAccount(AccountDto accountDto);

    AccountDto getAccountById(Long id);

    AccountDto deposit(long id, double amount);

    AccountDto withdraw(Long id, double amount);

    List<AccountDto> getAccounts();

    void deleteAccount(Long id);
}
