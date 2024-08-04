"use client";

import React from 'react';
import { Button, TextInput } from '@tremor/react';
import { Card } from '@tremor/react';
import { RiHomeSmileFill, RiAddLine } from '@remixicon/react';
import { useState } from 'react';
import ProductService from '@/services/ProductService';
import LoginService from '@/services/LoginService';

const Header = () => {
    var [url, setUrl] = useState('');
    var [name, setName] = useState('');

    function addProduct() {
        const regex = /\b\d{16}\b/;
        const match = url.match(regex);
        var id =  match ? match[0] : '';

        ProductService.addProduct({id: id, name: name, url: url}).then(response => {
            window.location.reload();
        });
    }

    function handleLogout() {
        LoginService.logout().then(response => {
            window.location.href = '/login';
        })
    }

    return (
        <Card className='h-full m-0 rounded-none ring-none bg-gb-brand-subtle'>
            <div className="flex items-center justify-between ">
                <div className="float-left">
                    <Button className="rounded-sm bg-gb-secondary-emphasis" icon={RiHomeSmileFill} iconPosition="left" size="lg" variant="primary">Panopti</Button>
                </div>

                <div className="float-center flex">
                    <TextInput className="text-gb-brand-subtle rounded-sm" onValueChange={(value) => setName(value)} placeholder="Product naam" />
                    <TextInput className="text-gb-brand-subtle rounded-sm" onValueChange={(value) => setUrl(value)} placeholder="Product url" />
                    <Button onClick={addProduct} className="float-right text-gb-brand-subtle bg-gb-secondary-emphasis rounded-sm" icon={RiAddLine}/>
                </div>

                <div className="float-right pr-3">
                    <Button onClick={handleLogout} className="text-gb-secondary-emphasis" size="lg" variant="light">Logout</Button>
                </div>
            </div>
        </Card>
    );
};

export default Header;