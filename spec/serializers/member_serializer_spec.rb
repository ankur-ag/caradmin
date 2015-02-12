require 'rails_helper'


describe 'MemberSerializer' do

    before(:each) do
        @member = Fabricate.build(:member)
    end

    subject do
        @member.active_model_serializer.new(@member)
    end

    it 'should have all the attributes' do
        expect(:email).to_not be_nil
        expect(:first_name).to_not be_nil
        expect(:last_name).to_not be_nil
        expect(:phone).to_not be_nil
    end
end